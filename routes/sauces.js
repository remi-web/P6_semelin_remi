const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const sauce = require('../controllers/sauces')

router.post('/', auth,multer,sauce.createSauce);
router.put('/:id', auth,multer,sauce.modifySauce);
router.delete('/:id', auth,sauce.deleteSauce);
router.get('/:id',sauce.getOneSauce);
router.get('/',multer,sauce.getAllSauces);
router.post('/:id/like', auth, sauce.likedSauce)

module.exports = router;