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
/*
    if (utilisateur.role === 'restaurateur' && utilisateur.statut === 'en_attente')
      return res.status(403).json({ message: '⏳ Compte en attente de validation' });

    if (utilisateur.role === 'restaurateur' && utilisateur.statut === 'refuse')
      return res.status(403).json({ message: '❌ Compte refusé' });
*/
    const token = jwt.sign(
      { id: utilisateur.id, role: utilisateur.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const nom =
      utilisateur.role === 'restaurateur' ? utilisateur.nomRestaurant
      : utilisateur.role === 'client'     ? `${utilisateur.prenom} ${utilisateur.nom}`
      : 'Admin';

    res.json({ token, role: utilisateur.role, nom });

  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

// ── INSCRIPTION CLIENT ──
const registerClient = async (req, res) => {
  try {
    console.log('REGISTER CLIENT body:', req.body);

    let { nom, prenom, email, motDePasse, telephone, adresse } = req.body;

    nom        = nom?.toString().trim();
    prenom     = prenom?.toString().trim();
    email      = email?.toString().trim();
    motDePasse = motDePasse?.toString().trim();
    telephone  = telephone?.toString().trim();
    adresse    = adresse?.toString().trim();

    const manquants = [];
    if (!nom)        manquants.push('nom');
    if (!prenom)     manquants.push('prenom');
    if (!email)      manquants.push('email');
    if (!motDePasse) manquants.push('motDePasse');
    if (!telephone)  manquants.push('telephone');
    if (!adresse)    manquants.push('adresse');

    if (manquants.length > 0)
      return res.status(400).json({ message: `Champs manquants : ${manquants.join(', ')} ❌` });

    const emailExist = await Utilisateur.findOne({ where: { email } });
    if (emailExist)
      return res.status(400).json({ message: 'Email déjà utilisé ❌' });

    const telExist = await Utilisateur.findOne({ where: { telephone } });
    if (telExist)
      return res.status(400).json({ message: 'Numéro de téléphone déjà utilisé ❌' });

    const hash = await bcrypt.hash(motDePasse, 10);

    await Utilisateur.create({
      email, motDePasse: hash, role: 'client',
      nom, prenom, telephone, adresse,
      nomRestaurant: null, adresseRestaurant: null,
      numeroRegistre: null, documentOfficiel: null, statut: null,
    });

    res.status(201).json({ message: 'Compte créé avec succès ✅' });

  } catch (err) {
    console.error('REGISTER CLIENT ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

// ── INSCRIPTION RESTAURATEUR ──
const registerRestaurateur = async (req, res) => {
  try {
    console.log('REGISTER RESTAURATEUR body:', req.body);

    let { nomRestaurant, adresseRestaurant, email, motDePasse, telephone, numeroRegistre } = req.body;

    nomRestaurant     = nomRestaurant?.toString().trim();
    adresseRestaurant = adresseRestaurant?.toString().trim();
    email             = email?.toString().trim();
    motDePasse        = motDePasse?.toString().trim();
    telephone         = telephone?.toString().trim();
    numeroRegistre    = numeroRegistre?.toString().trim();

    const documentOfficiel = req.file ? req.file.filename : null;

    const manquants = [];
    if (!nomRestaurant)     manquants.push('nomRestaurant');
    if (!adresseRestaurant) manquants.push('adresseRestaurant');
    if (!email)             manquants.push('email');
    if (!motDePasse)        manquants.push('motDePasse');
    if (!telephone)         manquants.push('telephone');
    if (!numeroRegistre)    manquants.push('numeroRegistre');
    if (!documentOfficiel)  manquants.push('documentOfficiel');

    if (manquants.length > 0)
      return res.status(400).json({ message: `Champs manquants : ${manquants.join(', ')} ❌` });

    const emailExist = await Utilisateur.findOne({ where: { email } });
    if (emailExist)
      return res.status(400).json({ message: 'Email déjà utilisé ❌' });

    const registreExist = await Utilisateur.findOne({ where: { numeroRegistre } });
    if (registreExist)
      return res.status(400).json({ message: 'Numéro de registre déjà utilisé ❌' });

    const hash = await bcrypt.hash(motDePasse, 10);

    await Utilisateur.create({
      email, motDePasse: hash, role: 'restaurateur',
      nomRestaurant, adresseRestaurant, telephone,
      numeroRegistre, documentOfficiel, statut: 'en_attente',
      nom: null, prenom: null, adresse: null,
    });

    res.status(201).json({ message: 'Restaurant créé avec succès ✅' });

  } catch (err) {
    console.error('REGISTER RESTAURATEUR ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { login, registerClient, registerRestaurateur };