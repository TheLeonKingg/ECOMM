const express = require('express');
const router = express.Router();

const deleteProductController = require('../../Controllers/Product/deleteProduct-controller')

router.route('/:id/:quantity').delete(deleteProductController.deleteProduct);

module.exports = router;