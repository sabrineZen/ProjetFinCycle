<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { creerCommande, getCommandesRestaurateur, changerStatutCommande } = require('../controllers/commandeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/',                    protect, creerCommande);
router.get('/restaurateur',         protect, getCommandesRestaurateur);
router.put('/:id/statut',           protect, changerStatutCommande);

module.exports = router;
=======
const express = require('express')
const router = express.Router()
const { getMesCommandes } = require('../controllers/commandeController')
const { protect } = require('../middleware/authMiddleware')
router.get('/mescommandes', protect, getMesCommandes)
module.exports = router
>>>>>>> e1677bec036c10e51ca653c7c4f7daf999cce722
