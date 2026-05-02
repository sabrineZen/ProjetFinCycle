const express = require('express');
const router = express.Router();
const { getProfil, updateProfil } = require('../controllers/restaurateurController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profil',    protect, getProfil);
router.put('/profil',    protect, updateProfil);

module.exports = router;