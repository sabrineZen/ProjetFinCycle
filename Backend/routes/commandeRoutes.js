const express = require('express');
const router = express.Router();
const { creerCommande, getCommandesRestaurateur, changerStatutCommande } = require('../controllers/commandeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/',                    protect, creerCommande);
router.get('/restaurateur',         protect, getCommandesRestaurateur);
router.put('/:id/statut',           protect, changerStatutCommande);

module.exports = router;