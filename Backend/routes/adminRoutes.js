const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Déstructure directement depuis adminController (pas besoin d'un 2e require)
const { getStats, getRestaurantsEnAttente, getActivites } = adminController;

// Routes Dashboard
router.get('/stats',      getStats);
router.get('/en-attente', getRestaurantsEnAttente);
router.get('/activites',  getActivites);

// Routes Utilisateurs
router.get('/utilisateurs',              adminController.getUtilisateurs);
router.delete('/utilisateurs/:id',       adminController.supprimerUtilisateur);
router.put('/utilisateurs/:id/valider',  adminController.validerRestaurateur);

// Routes Plats & Catégories
router.get('/plats',                         adminController.getPlats);
router.delete('/plats/:id',                  adminController.supprimerPlat);
router.patch('/plats/:id/disponibilite',     adminController.toggleDisponibilite);
router.get('/categories',                    adminController.getCategories);

module.exports = router;