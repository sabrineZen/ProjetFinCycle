const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getAllPlats, createPlat, updatePlat, deletePlat } = require('../controllers/platController');

// Configuration de Multer pour stocker les images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Le dossier de destination
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renomme le fichier avec la date pour éviter les doublons
  }
});

const upload = multer({ storage: storage });

// On ajoute upload.single('image') pour lire la photo avant de créer ou modifier
router.get('/', getAllPlats);          
router.post('/', upload.single('image'), createPlat);  
router.put('/:id', upload.single('image'), updatePlat); 
router.delete('/:id', deletePlat);      

module.exports = router;