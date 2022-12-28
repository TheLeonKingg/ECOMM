const User = require('../../../db/users');
const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';

module.exports.login = async(req,res)=>{
    if(req.body.email && req.body.password){
        let loginData = {
            email:req.body.email.toLowerCase(),
            password:req.body.password
        }

        let user = await User.findOne(loginData).select("-password");
        if(user){
            Jwt.sign({user}, jwtkey , {expiresIn:"2h"} ,(err,token)=>{
                if(err){
                    res.send({result:"Something Went Wrong , Please try again later !!"})
                }
                res.send({user,auth:token})
            })
        }
        else{
            res.status(404).send({result:'User Not Found'})
        }
    }
    else{
        res.status(404).send({result:'User Not Found'})
    }
}
