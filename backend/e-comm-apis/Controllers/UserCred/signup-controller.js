const User = require('../../../db/users');
const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';

module.exports.signup = async (req,res)=>{
    let user = new User({
        name:req.body.name.toLowerCase(),
        email:req.body.email.toLowerCase(),
        password:req.body.password
    });
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result}, jwtkey , {expiresIn:"2h"} ,(err,token)=>{
        if(err){
            res.send({result:"Something Went Wrong , Please try again later !!"})
        }
        res.send({result,auth:token})
    })
}