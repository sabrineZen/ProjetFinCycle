const express = require("express");
const multer = require("multer");
const path = require("path");
const router  = express.Router();

const {
  getCategories,
  getCategorieById,
  createCategorie,
  updateCategorie,
  deleteCategorie,
} = require("../controllers/categorieController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.get("/",       getCategories);
router.get("/:id",    getCategorieById);
router.post("/",      upload.single("image"), createCategorie);
router.put("/:id",    upload.single("image"), updateCategorie);
router.delete("/:id", deleteCategorie);

module.exports = router;