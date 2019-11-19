const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const productController = require('../controllers/product.controller');

router.get('/', authMiddleware.requireAuth, productController.index);

module.exports = router;