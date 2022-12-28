const express = require('express');
const router = express.Router();

const singleProductsController = require('../../Controllers/Product/getSingleProduct-controller');

router.route('/:id').get(singleProductsController.getSingleProducts);

module.exports = router;