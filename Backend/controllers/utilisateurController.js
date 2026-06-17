// controllers/utilisateurController.js
const { Utilisateur } = require('../models');

  //supprimer compte utilisateur(client)
const supprimerMonCompte = async (req, res) => {
  try {
    const { id } = req.body;

    const utilisateur = await Utilisateur.findByPk(id);

    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    await utilisateur.destroy();

    res.json({ message: "Compte supprimé avec succès" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getRestaurateurs = async (req, res) => {
  try {
    const restaurateurs = await Utilisateur.findAll({
      where: { role: 'restaurateur' },
      attributes: [
        'id', 'email', 'nomRestaurant', 'adresseRestaurant',
        'numeroRegistre', 'statut', 'nom', 'prenom', 'documentOfficiel'
      ]
    });
    
    res.json(restaurateurs);
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
module.exports = {supprimerMonCompte, getRestaurateurs, deleteRestaurateur};