const express = require('express');
const router = express.Router();
const { creerCommande, getCommandesRestaurateur, changerStatutCommande, getCommandesClient, getStatsClient } = require('../controllers/commandeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/',                    protect, creerCommande);
router.get('/restaurateur',         protect, getCommandesRestaurateur);
router.get('/stats/client',         protect, getStatsClient);
router.get('/client',               protect, getCommandesClient);
router.put('/:id/statut',           protect, changerStatutCommande);

module.exports = router;