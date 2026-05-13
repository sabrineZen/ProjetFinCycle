const express = require('express')
const router = express.Router()
const { getMesCommandes } = require('../controllers/commandeController')
const { protect } = require('../middleware/authMiddleware')
router.get('/mescommandes', protect, getMesCommandes)
module.exports = router