const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const commandeCtrl = require('../controllers/commandeController');

router.post('/checkout', protect, commandeCtrl.checkout);
router.get('/', protect, commandeCtrl.getOrders);
router.put('/:id/status', protect, commandeCtrl.updateStatus);
router.get('/count', protect, commandeCtrl.countClientOrders);
module.exports = router;