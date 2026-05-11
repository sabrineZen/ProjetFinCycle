const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const platCtrl = require('../controllers/platController'); // On importe tout le contrôleur ici

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// On dit à Express d'utiliser les fonctions du contrôleur
router.get('/', platCtrl.getAllPlats);          
router.post('/', upload.single('image'), platCtrl.createPlat);   
router.put('/:id', upload.single('image'), platCtrl.updatePlat); 
router.delete('/:id', platCtrl.deletePlat);      

module.exports = router;