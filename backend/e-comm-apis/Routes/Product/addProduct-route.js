const express = require('express');
const router = express.Router();

const addProductController = require('../../Controllers/Product/addProduct-controller');

router.route('/').post(addProductController.addProduct);

module.exports = router;