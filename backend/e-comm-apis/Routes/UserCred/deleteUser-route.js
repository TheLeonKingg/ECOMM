const express = require('express');
const router = express.Router();

const deleteUserController = require('../../Controllers/UserCred/deleteUser-controller');

router.route('/:id').delete(deleteUserController.deleteUser);

module.exports = router;