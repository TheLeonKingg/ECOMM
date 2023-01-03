const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const updateUserAddressControler = require('../../Controllers/UserCred/updateUserAddress-controller');

router.route('/:id').put(
    body('name',"Name Must be atleast of 3 characters").isLength({min:3}),
    body('pinCode',"pinCode must be atleast of 6 characters").isLength({min:6}),
    updateUserAddressControler.updateUserAddress);

module.exports = router;