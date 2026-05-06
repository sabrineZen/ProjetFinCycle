const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const { sequelize } = require('./models/index');

dotenv.config();

const app = express();

// ── Middlewares de base ──
app.use(cors());
app.use(express.json());

// ── LA SOLUTION RADICALE POUR LES IMAGES ──
const uploadsPath = path.resolve(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsPath));

console.log("📂 Dossier des images détecté ici :", uploadsPath);

// ── Modèles ──
require('./models/index');

// ── Routes ──
const authRoutes         = require('./routes/authRoutes');
const clientRoutes       = require('./routes/clientRoutes');
const restaurateurRoutes = require('./routes/restaurateurRoutes');
const adminRoutes         = require('./routes/adminRoutes');
const categorieRoutes    = require('./routes/categorieRoutes');
const platRoutes         = require('./routes/platRoutes');
const panierRoutes       = require('./routes/panierRoutes');
const commandeRoutes     = require('./routes/commandeRoutes');

app.use('/api/auth',          authRoutes);
app.use('/api/clients',       clientRoutes);
app.use('/api/restaurateurs', restaurateurRoutes);
app.use('/api/admin',         adminRoutes);
app.use('/api/categories',    categorieRoutes);
app.use('/api/plats',         platRoutes);
app.use('/api/panier',        panierRoutes);
app.use('/api/commandes',     commandeRoutes);

// ── Route test ──
app.get("/", (req, res) => {
  res.send("hello world 🚀");
});

const PORT = process.env.PORT || 5000;

// ── Synchronisation Sécurisée ──
sequelize.authenticate()
  .then(() => {
    console.log("✅ Base de données connectée");
    // ON ENLÈVE { alter: true } ICI POUR ÉVITER L'ERREUR DES 64 CLÉS
    return sequelize.sync(); 
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Erreur de connexion ou de synchronisation :", err);
  });