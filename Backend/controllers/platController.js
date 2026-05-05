const { Plat ,Categorie} = require('../models'); 

// ── RÉCUPÉRER TOUS LES PLATS ──
const getAllPlats = async (req, res) => {
  try {
    const plats = await Plat.findAll({
      include: [{ model: Categorie, attributes: ['id', 'nom'] }]  // ← jointure
    });

    const result = plats.map((p) => {
      const data = p.toJSON();
      return {
        ...data,
        image:       data.image ? `http://localhost:5000/uploads/${data.image}` : null,
        categorieId: data.Categorie?.id   || null,  // ← pour pré-remplir le select
        categorie:   data.Categorie?.nom  || '',     // ← pour afficher dans la carte
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération plats", erreur: err.message });
  }
};

// ── AJOUTER UN PLAT ──
const createPlat = async (req, res) => {
  try {
    const { nom, description, prix, categorieId, disponible } = req.body;  // ← categorieId
    const image = req.file ? req.file.filename : null;
    const estDisponible = disponible === 'true' || disponible === true;

    const nouveauPlat = await Plat.create({
      nom,
      description,
      prix,
      categorieId,   // ← directement la FK
      image,
      disponible: estDisponible,
    });

    res.status(201).json(nouveauPlat);
  } catch (err) {
    res.status(500).json({ message: "Erreur ajout plat", erreur: err.message });
  }
};

// ── MODIFIER UN PLAT ──
const updatePlat = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, prix, categorieId, disponible } = req.body;  // ← categorieId

    const plat = await Plat.findByPk(id);
    if (!plat) return res.status(404).json({ message: "Plat introuvable" });

    const estDisponible = disponible === 'true' || disponible === true;
    const image = req.file ? req.file.filename : plat.image;

    await plat.update({ nom, description, prix, categorieId, image, disponible: estDisponible });

    res.json(plat);
  } catch (err) {
    res.status(500).json({ message: "Erreur modification plat", erreur: err.message });
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