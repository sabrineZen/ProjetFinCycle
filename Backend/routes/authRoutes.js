const express = require("express");
const router = express.Router();
const uploadDoc = require("../config/uploadDoc");
const { login, registerClient, registerRestaurateur } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const Utilisateur = require("../models/utilisateurModel");

router.post("/login", login);
router.post("/register/client", registerClient);
router.post("/register/restaurateur", uploadDoc.single("documentOfficiel"), registerRestaurateur);

// GET /api/auth/me
router.get("/me", protect, async (req, res) => {
  try {
    const user = await Utilisateur.findByPk(req.user.id, {
      attributes: ["id", "nom", "prenom", "email", "telephone", "adresse", "role"]
    });
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", detail: err.message });
  }
});

// PUT /api/auth/update
router.put("/update", protect, async (req, res) => {
  try {
    const { nom, prenom, email, telephone, adresse } = req.body;
    const user = await Utilisateur.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    await user.update({ nom, prenom, email, telephone, adresse });
    res.json({
      message: "Profil mis à jour",
      utilisateur: { id: user.id, nom: user.nom, prenom: user.prenom, email: user.email, telephone: user.telephone, adresse: user.adresse }
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", detail: err.message });
  }
});

module.exports = router;