const { Plat } = require('../models'); 

// ── RÉCUPÉRER TOUS LES PLATS ──
const getAllPlats = async (req, res) => {
  try {
    const plats = await Plat.findAll();
    res.json(plats);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des plats", erreur: err.message });
  }
};

// ── AJOUTER UN PLAT ──
const createPlat = async (req, res) => {
  try {
    const { nom, description, prix, categorie, disponible } = req.body;

    // ✅ On stocke seulement le filename, pas l'URL complète
    const image = req.file ? req.file.filename : null;

    const estDisponible = disponible === 'true' || disponible === true;

    const nouveauPlat = await Plat.create({
      nom,
      description,
      prix,
      categorie,
      image,          // ← juste "pizza.jpg"
      disponible: estDisponible
    });

    res.status(201).json(nouveauPlat);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'ajout du plat", erreur: err.message });
  }
};

// ── MODIFIER UN PLAT ──
const updatePlat = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, prix, categorie, disponible } = req.body;

    const plat = await Plat.findByPk(id);
    if (!plat) return res.status(404).json({ message: "Plat introuvable" });

    const estDisponible = disponible === 'true' || disponible === true;

    // ✅ Pareil ici
    const image = req.file ? req.file.filename : plat.image;

    await plat.update({ nom, description, prix, categorie, image, disponible: estDisponible });

    res.json(plat);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la modification du plat", erreur: err.message });
  }
};

// ── SUPPRIMER UN PLAT ──
const deletePlat = async (req, res) => {
  try {
    const { id } = req.params;

    const plat = await Plat.findByPk(id);
    if (!plat) {
      return res.status(404).json({ message: "Plat introuvable" });
    }

    await plat.destroy();
    res.json({ message: "✅ Plat supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression du plat", erreur: err.message });
  }
};

module.exports = { getAllPlats, createPlat, updatePlat, deletePlat };