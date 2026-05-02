const { Restaurateur, Utilisateur } = require('../models/index');

// ── GET PROFIL RESTAURATEUR ──
const getProfil = async (req, res) => {
  try {
    const restaurateur = await Restaurateur.findOne({
      where: { utilisateurId: req.user.id },
      include: [{ model: Utilisateur, attributes: ['email'] }]
    });

    if (!restaurateur) {
      return res.status(404).json({ message: 'Restaurateur introuvable' });
    }

    res.json({
      nomRestaurant:     restaurateur.nomRestaurant,
      numeroRegistre:    restaurateur.numeroRegistre,
      adresseRestaurant: restaurateur.adresseRestaurant,
      telephone:         restaurateur.telephone,
      email:             restaurateur.Utilisateur.email,
      documentOfficiel:  restaurateur.documentOfficiel,
      statut:            restaurateur.statut
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── UPDATE PROFIL RESTAURATEUR ──
const updateProfil = async (req, res) => {
  try {
    const { nomRestaurant, adresseRestaurant, telephone, email } = req.body;

    const restaurateur = await Restaurateur.findOne({
      where: { utilisateurId: req.user.id }
    });

    if (!restaurateur) {
      return res.status(404).json({ message: 'Restaurateur introuvable' });
    }

    // Mettre à jour le restaurateur
    await restaurateur.update({ nomRestaurant, adresseRestaurant, telephone });

    // Mettre à jour l'email dans Utilisateur
    await Utilisateur.update(
      { email },
      { where: { id: req.user.id } }
    );

    res.json({ message: '✅ Profil mis à jour avec succès' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProfil, updateProfil };