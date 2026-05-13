const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { protect } = require('../middleware/authMiddleware');
const { getRestaurateurs , deleteRestaurateur , getProfil, updateProfil,changerMotDePasse,supprimerCompte} = require('../controllers/utilisateurController');
// const { verifierToken, estAdmin } = require('../middleware/authMiddleware'); // décommente si tu as un middleware auth

router.get('/restaurateurs',getRestaurateurs);
router.delete('/restaurateurs/:id', deleteRestaurateur);
router.get('/profil',protect, getProfil);
router.put('/profil',protect, updateProfil);
router.put('/motdepasse', protect, changerMotDePasse)
router.delete('/supprimer', protect, supprimerCompte)

=======
const { getRestaurateurs , deleteRestaurateur,getProfil,updateProfil,changerMotDePasse,supprimerCompte} = require('../controllers/utilisateurController');
// const { verifierToken, estAdmin } = require('../middleware/authMiddleware'); // décommente si tu as un middleware auth
const { protect } = require('../middleware/authMiddleware');
router.get('/restaurateurs', /* verifierToken, estAdmin, */ getRestaurateurs);
router.delete('/restaurateurs/:id', deleteRestaurateur);
router.get('/profil', protect, getProfil);
router.put('/profil', protect, updateProfil);
router.put('/motdepasse', protect, changerMotDePasse);
router.delete('/supprimer', protect, supprimerCompte);
>>>>>>> frontend
module.exports = router;