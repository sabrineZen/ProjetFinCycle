const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getProfil, updateProfil,supprimerMonCompte,updatePassword } = require('../controllers/clientController');

router.get('/profil', protect, getProfil);
router.put('/profil', protect, updateProfil);
router.delete('/mon-compte', protect, supprimerMonCompte);
router.put("/mot-de-passe", protect, updatePassword);



module.exports = router;