const { Utilisateur } = require('../models/index');

const getProfil = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.user.id, {
      attributes: ['id', 'nom', 'prenom', 'email', 'telephone', 'adresse', 'role']
    });

    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur introuvable' });

    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProfil = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, adresse } = req.body;

    await Utilisateur.update(
      { nom, prenom, email, telephone, adresse },
      { where: { id: req.user.id } }
    );

    res.json({ message: '✅ Profil mis à jour avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProfil, updateProfil };