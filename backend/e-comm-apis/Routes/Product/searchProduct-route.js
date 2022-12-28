const express = require('express');
const router = express.Router();

const searchProductController = require('../../Controllers/Product/searchProduct-controller');

router.route('/:key').get(searchProductController.searchProduct);

module.exports = router;