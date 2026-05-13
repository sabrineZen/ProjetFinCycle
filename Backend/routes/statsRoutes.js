const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

// L'URL : http://localhost:5000/api/admin/statistiques/global
router.get("/global", statsController.getGlobalStats);

// L'URL : http://localhost:5000/api/admin/statistiques/dashboard-restaurateur
// ✅ Vérifie que "getRestaurateurDashboard" est bien écrit comme dans le contrôleur
router.get("/dashboard-restaurateur", statsController.getRestaurateurDashboard);

module.exports = router;