// controllers/utilisateurController.js
const { Utilisateur, Plat } = require('../models');

const getRestaurateurs = async (req, res) => {
  try {
    const restaurateurs = await Utilisateur.findAll({
      where: { role: 'restaurateur', statut: 'approuve' },
      attributes: [
        'id', 'email', 'nomRestaurant', 'adresseRestaurant',
        'numeroRegistre', 'statut', 'nom', 'prenom', 'documentOfficiel'
      ]
    });

    const data = await Promise.all(restaurateurs.map(async (restaurateur) => {
      const nombrePlats = await Plat.count({ where: { utilisateurId: restaurateur.id } });
      return {
        ...restaurateur.toJSON(),
        nombrePlats,
      };
    }));

    data.sort((a, b) => (b.nombrePlats || 0) - (a.nombrePlats || 0));
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
const deleteRestaurateur = async (req, res) => {
  try {
    const { id } = req.params;
    const utilisateur = await Utilisateur.findOne({ 
      where: { id, role: 'restaurateur' } 
    });
    
    if (!utilisateur) {
      return res.status(404).json({ message: 'Restaurateur non trouvé' });
    }

    await utilisateur.destroy();
    res.json({ message: 'Restaurateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }

};
module.exports = { getRestaurateurs, deleteRestaurateur};