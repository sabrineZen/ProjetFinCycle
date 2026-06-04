const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const platCtrl = require('../controllers/platController'); // On importe tout le contrôleur ici

const { protect } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// On dit à Express d'utiliser les fonctions du contrôleur
router.get('/', protect, platCtrl.getAllPlats);          
router.post('/', protect, upload.single('image'), platCtrl.createPlat);   
router.put('/:id', protect, upload.single('image'), platCtrl.updatePlat); 
router.delete('/:id', protect, platCtrl.deletePlat);      

module.exports = router;