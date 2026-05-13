const express = require('express');
const router = express.Router();
const { creerCommande } = require('../controllers/commandeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, creerCommande);

module.exports = router;