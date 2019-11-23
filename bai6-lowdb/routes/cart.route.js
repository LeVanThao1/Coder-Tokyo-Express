const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.get('/add:productId', cartController.addToCart);
router.get('/', cartController.getCart);
router.get('/delete:productId', cartController.deleteCart);

module.exports = router;