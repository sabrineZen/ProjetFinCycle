const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Routes Utilisateurs
router.get('/utilisateurs', adminController.getUtilisateurs);
router.delete('/utilisateurs/:id', adminController.supprimerUtilisateur);

// Route pour valider un restaurateur (PUT)
router.put('/utilisateurs/:id/valider', adminController.validerRestaurateur);

// Routes Plats & Catégories
router.get('/plats', adminController.getPlats);
router.delete('/plats/:id', adminController.supprimerPlat);
router.get('/categories', adminController.getCategories);
router.get('/stats-dashboard', adminController.getDashboardStats);

module.exports = router;