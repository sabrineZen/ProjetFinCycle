const { Commande } = require('../models')
function getMesCommandes(req, res) {
  Commande.findAll({
    where: { utilisateurId: req.user.id },
    order: [['dateCommande', 'DESC']]
  })
  .then(commandes => {
    res.status(200).json(commandes)
  })
  .catch(error => {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  })
}
module.exports = { getMesCommandes }