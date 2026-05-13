const { Commande } = require('../models');
const getMesCommandes = async (req, res) => {
  try {
    const commandes = await Commande.findAll({
      where: { utilisateurId: req.user.id },
      order: [['dateCommande', 'DESC']]
    })
    if (!commandes) {
      return res.status(404).json({ message: 'Aucune commande trouvée' })
    }
    res.status(200).json(commandes)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  }
}
module.exports = { getMesCommandes }