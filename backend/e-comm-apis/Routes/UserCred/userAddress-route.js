const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const userAddressControler = require('../../Controllers/UserCred/userAddress-controller');

router.route('/').post(
    body('name',"Name Must be atleast of 3 characters").isLength({min:3}),
    body('pinCode',"pinCode must be atleast of 6 characters").isLength({min:6}),
userAddressControler.userAddress);

module.exports = router;