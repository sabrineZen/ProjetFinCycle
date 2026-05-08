const express = require("express");
const router = express.Router();
const multer = require("multer");
const { login, registerClient, registerRestaurateur } = require("../controllers/authController");

const upload = multer({ dest: "uploads/" });

router.post("/login", login);
router.post("/register/client", registerClient);
router.post("/register/restaurateur", upload.single("documentOfficiel"), registerRestaurateur);

module.exports = router;