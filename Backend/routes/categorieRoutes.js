const express = require("express");
const router  = express.Router();

const {
  getCategories,
  getCategorieById,
  createCategorie,
  updateCategorie,
  deleteCategorie,
} = require("../controllers/categorieController");

// Vérifie que les fonctions sont bien importées
console.log("categorieController chargé :", {
  getCategories:    typeof getCategories,
  getCategorieById: typeof getCategorieById,
  createCategorie:  typeof createCategorie,
  updateCategorie:  typeof updateCategorie,
  deleteCategorie:  typeof deleteCategorie,
});

router.get("/",       getCategories);
router.get("/:id",    getCategorieById);
router.post("/",      createCategorie);
router.put("/:id",    updateCategorie);
router.delete("/:id", deleteCategorie);

module.exports = router;