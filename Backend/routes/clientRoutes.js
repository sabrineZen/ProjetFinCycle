const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getProfil, updateProfil } = require('../controllers/clientController');

router.get('/profil', protect, getProfil);
router.put('/profil', protect, updateProfil);

module.exports = router;