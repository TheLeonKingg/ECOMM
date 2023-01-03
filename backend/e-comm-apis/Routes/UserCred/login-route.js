const express = require('express');
const router = express.Router();
const { body} = require('express-validator');

const loginController = require('../../Controllers/UserCred/login-controller')

router.route('/').post(
    body('email',"Invalid Email").isEmail(),
    body('password','Password must be atleast of 8 characters with min one Upper and  Lower cases and must have a number and a symbol').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
,loginController.login);

module.exports = router;