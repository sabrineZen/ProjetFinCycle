const bcrypt = require('bcryptjs');
const { Utilisateur } = require('../models/index');

// ── GET PROFIL ──
const getProfil = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.user.id, {
      attributes: ['nomRestaurant', 'numeroRegistre', 'adresseRestaurant', 'telephone', 'email', 'documentOfficiel', 'statut']
    });

    if (!utilisateur) return res.status(404).json({ message: 'Introuvable' });

    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── UPDATE PROFIL ──
const updateProfil = async (req, res) => {
  try {
    const { nomRestaurant, adresseRestaurant, telephone, email } = req.body;

    await Utilisateur.update(
      { nomRestaurant, adresseRestaurant, telephone, email },
      { where: { id: req.user.id } }
    );

    res.json({ message: '✅ Profil mis à jour avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ── CHANGER MOT DE PASSE ──
// Utilise uniquement motDePasse qui existe déjà dans la BDD
// Aucune nouvelle colonne ajoutée !
const changePassword = async (req, res) => {
  try {
    const { motDePasseActuel, nouveauMotDePasse, confirmerMotDePasse } = req.body;

    if (!motDePasseActuel || !nouveauMotDePasse || !confirmerMotDePasse) {
      return res.status(400).json({ message: '❌ Tous les champs sont obligatoires' });
    }
    if (nouveauMotDePasse !== confirmerMotDePasse) {
      return res.status(400).json({ message: '❌ Les mots de passe ne correspondent pas' });
    }
    if (nouveauMotDePasse.length < 6) {
      return res.status(400).json({ message: '❌ Minimum 6 caractères' });
    }

    // Récupérer motDePasse existant dans la BDD
    const utilisateur = await Utilisateur.findByPk(req.user.id);

    // Vérifier l'ancien mot de passe
    const isMatch = await bcrypt.compare(motDePasseActuel, utilisateur.motDePasse);
    if (!isMatch) return res.status(401).json({ message: '❌ Mot de passe actuel incorrect' });

    // Hasher et mettre à jour dans la même colonne motDePasse
    const hash = await bcrypt.hash(nouveauMotDePasse, 10);
    await utilisateur.update({ motDePasse: hash });

    res.json({ message: '✅ Mot de passe changé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProfil, updateProfil , changePassword };