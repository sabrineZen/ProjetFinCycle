const express = require('express');
const router = express.Router();
module.exports = router;
//declaration de routes pour les plats
const {chargerplats,
        platsPopulaires,
        filtrerplats
}=require('../controllers/platClientController');
//chargement de plat

router.get('/chargerplats',chargerplats)
router.get('/chargerplatsPopulaires',platsPopulaires)
router.get('/filtrerplats',filtrerplats)
