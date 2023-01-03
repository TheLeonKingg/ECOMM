const express = require('express');
const router = express.Router();

const deleteCartProductController = require('../../Controllers/Product/delete-cart-product-controller');

router.route('/:id/:quantity').delete(deleteCartProductController.deleteCartProduct);

module.exports = router;