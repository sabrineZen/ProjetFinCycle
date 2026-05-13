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
  historiquePanier
} = require('../controllers/platClientController');

// ── Routes Plats ──
router.get('/populaires', getPlatPopulaires);
router.get('/categorie/:categorieId', getPlatsByCategorie);
router.get('/filtrer', filtrerPlats);

// ── Routes Panier ──
router.post('/panier/ajouter', ajouterAuPanier);
router.put('/panier/:lignePanierId/augmenter', augmenterQuantite);
router.put('/panier/:lignePanierId/diminuer', diminuerQuantite);
router.delete('/panier/:lignePanierId/supprimer', supprimerDuPanier);

// ── Routes Historique ──
router.get('/historique/:utilisateurId', historiquePanier);

module.exports = router;
