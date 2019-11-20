const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' })

const authMiddleware = require('../middlewares/auth.middleware');
const productController = require('../controllers/product.controller');
const productValidation = require('../validation/product.validation');

router.get('/', authMiddleware.requireAuth, productController.index);
router.get('/add', authMiddleware.requireAuth, productController.getPage);
router.post('/add', upload.single('image'),  productValidation.postAdd, productController.addProduct);

module.exports = router;