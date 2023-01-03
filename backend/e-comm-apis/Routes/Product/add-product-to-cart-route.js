const express = require('express');
const router = express.Router();

const addProductToCartController = require('../../Controllers/Product/add-product-to-cart-controller');

router.route('/').post(addProductToCartController.addProductToCart);

module.exports = router;