const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const signupController = require('../../Controllers/UserCred/signup-controller');

router.route('/').post(
    body('name',"Name Must be atleast of 3 characters").isLength({min:3}),
    body('email',"Invalid Email").isEmail(),
    body('password','Password must be atleast of 8 characters with min one Upper and  Lower cases and must have a number and a symbol').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }),
signupController.signup);

module.exports = router;