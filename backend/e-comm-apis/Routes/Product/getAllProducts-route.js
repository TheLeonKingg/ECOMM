const express = require('express');
const router = express.Router();

const allProductsController = require('../../Controllers/Product/getAllProducts-controller');

router.route('/').get(allProductsController.getAllProducts);

module.exports = router;