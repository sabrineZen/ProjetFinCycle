const express = require("express");
const router  = express.Router();

const {
  getCategories,
  getCategorieById,
  createCategorie,
  updateCategorie,
  deleteCategorie,
  uploadImageCategorie,
  upload,
} = require("../controllers/categorieController");

<<<<<<< HEAD
=======
// Vérifie que les fonctions sont bien importées
console.log("categorieController chargé :", {
  getCategories:    typeof getCategories,
  getCategorieById: typeof getCategorieById,
  createCategorie:  typeof createCategorie,
  updateCategorie:  typeof updateCategorie,
  deleteCategorie:  typeof deleteCategorie,
});

>>>>>>> e1677bec036c10e51ca653c7c4f7daf999cce722
router.get("/",       getCategories);
router.get("/:id",    getCategorieById);
router.post("/",      createCategorie);
router.put("/:id",    updateCategorie);
router.delete("/:id", deleteCategorie);
router.post("/:id/image", upload.single("image"), uploadImageCategorie); // 👈 nouveau

module.exports = router;