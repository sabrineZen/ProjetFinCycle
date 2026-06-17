const express = require('express');
const router = express.Router();
const { getRestaurateurs , deleteRestaurateur,supprimerMonCompte} = require('../controllers/utilisateurController');
// const { verifierToken, estAdmin } = require('../middleware/authMiddleware'); // décommente si tu as un middleware auth

router.get('/restaurateurs', /* verifierToken, estAdmin, */ getRestaurateurs);
router.delete('/restaurateurs/:id', deleteRestaurateur);


module.exports = router;