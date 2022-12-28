const express = require('express');
const router = express.Router();

const updateProductController = require('../../Controllers/Product/updateProduct-controller')

router.route('/:id').put(updateProductController.updateProduct);

module.exports = router;