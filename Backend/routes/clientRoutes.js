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

// ── AFFICHER LES PLATS POPULAIRES (ClientHome) ──
router.get('/plats/populaires', getPlatPopulaires);

// ── CHARGER LES PLATS PAR CATÉGORIE ──
router.get('/plats/categorie/:categorieId', getPlatsByCategorie);

// ── FILTRER LES PLATS (Recherche) ──
router.get('/plats/filtrer', filtrerPlats);

// ── AJOUTER AU PANIER (Fonctionne depuis partout : categorie, populaires, recherche) ──
router.post('/panier/ajouter', ajouterAuPanier);

// ── AUGMENTER LA QUANTITÉ DANS LE PANIER ──
router.put('/panier/:lignePanierId/augmenter', augmenterQuantite);

// ── DIMINUER LA QUANTITÉ DANS LE PANIER ──
router.put('/panier/:lignePanierId/diminuer', diminuerQuantite);

// ── SUPPRIMER DU PANIER ──
router.delete('/panier/:lignePanierId/supprimer', supprimerDuPanier);

// ── AFFICHER L'HISTORIQUE DES COMMANDES ──
router.get('/historique/:utilisateurId', historiquePanier);

module.exports = router;