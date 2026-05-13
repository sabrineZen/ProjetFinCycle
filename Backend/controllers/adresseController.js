const { Adresse } = require('../models')
// Récupérer toutes les adresses
function getMesAdresses(req, res) {
  Adresse.findAll({ where: { utilisateurId: req.user.id } })
  .then(adresses => {
    res.status(200).json(adresses)
  })
  .catch(error => {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  })
}
// Ajouter une adresse
function ajouterAdresse(req, res) {
  const { type, rue, ville, pays } = req.body

  Adresse.create({ type, rue, ville, pays, utilisateurId: req.user.id })
  .then(adresse => {
    res.status(201).json({ message: 'Adresse ajoutée', adresse })
  })
  .catch(error => {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  })
}

//Définir par défaut
function definirParDefaut(req, res) {
  const id = req.params.id

//enlever parDefaut de toutes les adresses
  Adresse.update({ parDefaut: false }, { where: { utilisateurId: req.user.id } })
  .then(() => {
    // mettre parDefaut 
    return Adresse.update({ parDefaut: true }, { where: { id, utilisateurId: req.user.id } })
  })
  .then(() => {
    res.status(200).json({ message: 'Adresse par défaut mise à jour' })
  })
  .catch(error => {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  })
}
// Supprimer une adresse
function supprimerAdresse(req, res) {
  const id = req.params.id

  Adresse.destroy({ where: { id, utilisateurId: req.user.id } })
  .then(() => {
    res.status(200).json({ message: 'Adresse supprimée' })
  })
  .catch(error => {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  })
}
module.exports = { getMesAdresses, ajouterAdresse, definirParDefaut, supprimerAdresse }