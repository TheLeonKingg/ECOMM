const User = require('../../../db/users');
const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';
const { validationResult } = require('express-validator');

module.exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email = await User.findOne({ email: req.body.email });
    if (email) {
        res.send({
            data:[],
            success:false,
            msg:"Email Already Exist"
        })
    }
    else {
        let user = new User({
            name: req.body.name.toLowerCase(),
            email: req.body.email.toLowerCase(),
            password: req.body.password
        });
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                res.send({ result: "Something Went Wrong , Please try again later !!" })
            }
            res.send({ result, auth: token })
        })
    }
}