const express = require("express");
const router = express.Router();
// On pointe directement vers controllers/statsController.js
const statsController = require("../controllers/statsController");

// L'URL sera : http://localhost:5000/api/admin/statistiques/global
router.get("/global", statsController.getGlobalStats);

module.exports = router;