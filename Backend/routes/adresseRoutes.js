const express = require('express')
const router = express.Router()
const { getMesAdresses, ajouterAdresse, definirParDefaut, supprimerAdresse } = require('../controllers/adresseController')
const { protect } = require('../middleware/authMiddleware')

router.get('/',protect,getMesAdresses)
router.post('/',protect,ajouterAdresse)
router.put('/:id/defaut',protect,definirParDefaut)
router.delete('/:id',protect,supprimerAdresse)

module.exports = router