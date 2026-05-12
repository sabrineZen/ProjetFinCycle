const express = require("express");
const router = express.Router();
const uploadDoc = require("../config/uploadDoc"); // ← remplace multer inline
const { login, registerClient, registerRestaurateur } = require("../controllers/authController");

router.post("/login", login);
router.post("/register/client", registerClient);
router.post("/register/restaurateur", uploadDoc.single("documentOfficiel"), registerRestaurateur);

module.exports = router;