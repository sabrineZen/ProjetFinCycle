const express = require('express');
const router = express.Router();
const { getProfil, updateProfil, changePassword } = require('../controllers/restaurateurController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profil',          protect, getProfil);
router.put('/profil',          protect, updateProfil);
router.put('/change-password', protect, changePassword);

module.exports = router;