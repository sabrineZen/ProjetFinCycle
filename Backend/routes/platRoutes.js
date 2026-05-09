const express = require('express');
const router = express.Router();
module.exports = router;
//declaration de routes pour les plats
const {chargerplats,
        chargerplatsPopulaires,
        filtrerplats,

}=require('../controllers/platcontroller');
//chargement de plat
router.get('/chargerplats',chargerplats)
router.get('/chargerplatsPopulaires',chargerplatsPopulaires)
router.get('/filtrerplats',filtrerplats)
