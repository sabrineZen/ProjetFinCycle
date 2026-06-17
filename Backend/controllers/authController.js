const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Utilisateur } = require('../models/index');

// ── CONNEXION ──
const login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    if (!email || !motDePasse)
      return res.status(400).json({ message: 'Email et mot de passe requis ❌' });

    const utilisateur = await Utilisateur.findOne({ where: { email: email.trim() } });
    if (!utilisateur)
      return res.status(404).json({ message: 'Email introuvable ❌' });

    const isMatch = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!isMatch)
      return res.status(401).json({ message: 'Mot de passe incorrect ❌' });

    // ── MODIFICATION ICI : VERIFICATION DU STATUT ──
    if (utilisateur.role === 'restaurateur') {
      if (utilisateur.statut === 'en_attente') {
        return res.status(403).json({ message: '⏳ Votre compte est en attente de validation par l\'administrateur.' });
      }
      if (utilisateur.statut === 'refuse') {
        return res.status(403).json({ message: '❌ Votre demande d\'inscription a été refusée.' });
      }
    }
    // ───────────────────────────────────────────────

    const token = jwt.sign(
      { id: utilisateur.id, role: utilisateur.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const nom =
      utilisateur.role === 'restaurateur' ? utilisateur.nomRestaurant
      : utilisateur.role === 'client'     ? `${utilisateur.prenom} ${utilisateur.nom}`
      : 'Admin';

    const user = {
      id: utilisateur.id,
      role: utilisateur.role,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      email: utilisateur.email,
      telephone: utilisateur.telephone,
      adresse: utilisateur.adresse,
      nomRestaurant: utilisateur.nomRestaurant,
      adresseRestaurant: utilisateur.adresseRestaurant,
      numeroRegistre: utilisateur.numeroRegistre,
      statut: utilisateur.statut,
    };

    res.json({ token, role: utilisateur.role, nom, user });

  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

//condition nombre caractere mot de passe
const validatePassword = (password) => {
  const minLength = 6;
  const maxLength = 20;
  const majiscule=/[A-Z]/.test(password);
  const minuscule=/[a-z]/.test(password);
  const chiffre=/[0-9]/.test(password);
  return (  

     password &&
    password.length >= minLength &&
    password.length <= maxLength &&
    majiscule &&
    minuscule &&
    chiffre);
};
// ── INSCRIPTION CLIENT ──
const registerClient = async (req, res) => {
  try {
    let { nom, prenom, email, motDePasse, telephone, adresse } = req.body;

    if (!validatePassword(motDePasse)) {
      return res.status(400).json({
        message:
          "Mot de passe invalide : 6-20 caractères + majuscule + minuscule + chiffre"
      });
    }

    const hash = await bcrypt.hash(motDePasse, 10);

    await Utilisateur.create({
      email, motDePasse: hash, role: 'client',
      nom, prenom, telephone, adresse,
      nomRestaurant: null, adresseRestaurant: null,
      numeroRegistre: null, documentOfficiel: null, statut: null,
    });

    res.status(201).json({ message: 'Compte créé avec succès ✅' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── INSCRIPTION RESTAURATEUR ──
const registerRestaurateur = async (req, res) => {
  try {
    let { nomRestaurant, adresseRestaurant, email, motDePasse, telephone, numeroRegistre } = req.body;
    const documentOfficiel = req.file ? req.file.filename : null;

    if (!validatePassword(motDePasse)) {
      return res.status(400).json({
        message:
          "Mot de passe invalide : 6-20 caractères + majuscule + minuscule + chiffre"
      });
    }

    const hash = await bcrypt.hash(motDePasse, 10);

    await Utilisateur.create({
      email, motDePasse: hash, role: 'restaurateur',
      nomRestaurant, adresseRestaurant, telephone,
      numeroRegistre, documentOfficiel, statut: 'en_attente', // Important : statut par défaut
      nom: null, prenom: null, adresse: null,
    });

    res.status(201).json({ message: 'Demande envoyée ! Votre compte est en attente de validation. ✅' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { login, registerClient, registerRestaurateur };