const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const platCtrl = require('../controllers/platController');
const { protect } = require('../middleware/authMiddleware'); // ← adapter le chemin

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

router.get('/', platCtrl.getAllPlats);          
router.post('/', protect, upload.single('image'), platCtrl.createPlat);   // ← protect ajouté
router.put('/:id', protect, upload.single('image'), platCtrl.updatePlat); // ← protect ajouté
router.delete('/:id', protect, platCtrl.deletePlat);      

module.exports = router;