const express = require('express');
const router = express.Router();
const {
  getPlatPopulaires,
  getPlatsByCategorie,
  filtrerPlats,
  ajouterAuPanier,
  augmenterQuantite,
  diminuerQuantite,
  supprimerDuPanier,
  historiquePanier,
  getRestaurantsPopulaires
} = require('../controllers/platClientController');

router.get('/populaires',                          getPlatPopulaires);
router.get('/restaurants-populaires',              getRestaurantsPopulaires);
router.get('/categorie/:categorieId',              getPlatsByCategorie);
router.get('/filtrer',                             filtrerPlats);
router.post('/panier/ajouter',                     ajouterAuPanier);
router.put('/panier/:lignePanierId/augmenter',     augmenterQuantite);
router.put('/panier/:lignePanierId/diminuer',      diminuerQuantite);
router.delete('/panier/:lignePanierId/supprimer',  supprimerDuPanier);
router.get('/historique/:utilisateurId',           historiquePanier);

module.exports = router;