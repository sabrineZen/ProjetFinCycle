const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require('./models/index');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ── Modèles ──
require('./models/index');

// ── Routes ──
const authRoutes         = require('./routes/authRoutes');
const clientRoutes       = require('./routes/clientRoutes');
const restaurateurRoutes = require('./routes/restaurateurRoutes');
const adminRoutes        = require('./routes/adminRoutes');
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

app.use('/uploads', express.static('uploads')); // ← ici avant listen

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log("✅ Base de données connectée");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Erreur de connexion :", err);
  });