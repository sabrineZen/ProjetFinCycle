const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

// Route pour l'Admin
router.get("/global", statsController.getGlobalStats);

// Route pour le Restaurateur
// ✅ Vérifie bien que le nom getRestaurateurDashboard est identique au controller
router.get("/dashboard-restaurateur", statsController.getRestaurateurDashboard);

module.exports = router;