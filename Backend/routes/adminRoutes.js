const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');

// ── Config multer ──
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

const {
  getUtilisateurs,
  supprimerUtilisateur,
  getPlats,
  supprimerPlat,
  toggleDisponibilite,
  getCategories,
  ajouterCategorie,
  modifierCategorie,
  supprimerCategorie,
} = require('../controllers/adminController');

// ── Utilisateurs ──
router.get('/utilisateurs',        getUtilisateurs);
router.delete('/utilisateurs/:id', supprimerUtilisateur);

// ── Plats ──
router.get('/plats',                     getPlats);
router.delete('/plats/:id',              supprimerPlat);
router.patch('/plats/:id/disponibilite', toggleDisponibilite);

// ── Catégories ──
router.get('/categories',        getCategories);
router.post('/categories',       upload.single('image'), ajouterCategorie);
router.put('/categories/:id',    upload.single('image'), modifierCategorie);
router.delete('/categories/:id', supprimerCategorie);

module.exports = router;