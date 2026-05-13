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

router.get("/",       getCategories);
router.get("/:id",    getCategorieById);
router.post("/",      createCategorie);
router.put("/:id",    updateCategorie);
router.delete("/:id", deleteCategorie);
router.post("/:id/image", upload.single("image"), uploadImageCategorie); // 👈 nouveau

module.exports = router;