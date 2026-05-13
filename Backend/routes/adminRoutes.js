const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Déstructure les fonctions
const { 
  getStats, 
  getRestaurantsEnAttente, 
  getActivites,
  getUtilisateurs,
  supprimerUtilisateur,
  validerRestaurateur,
  getPlats,
  supprimerPlat,
  toggleDisponibilite,
  getCategories 
} = adminController;

// Routes Dashboard
router.get('/stats',      getStats);
router.get('/en-attente', getRestaurantsEnAttente);
router.get('/activites',  getActivites);

// Routes Utilisateurs
router.get('/utilisateurs',             getUtilisateurs);
router.delete('/utilisateurs/:id',      supprimerUtilisateur);

// --- C'EST CETTE LIGNE QU'ON ADAPTE ---
// On utilise 'valider-restaurateur' pour correspondre au fetch du frontend

router.put('/utilisateurs/:id/valider', validerRestaurateur);

// Routes Plats & Catégories
router.get('/plats',                         getPlats);
router.delete('/plats/:id',                  supprimerPlat);
router.patch('/plats/:id/disponibilite',     toggleDisponibilite);
router.get('/categories',                    getCategories);

module.exports = router;