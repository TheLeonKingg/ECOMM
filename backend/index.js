const express = require('express');
const cors = require('cors')
const multer  = require('multer')
const path = require('path');
const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';

require('./db/config');
const User = require('./db/users');
const Product = require('./db/product');
const { response } = require('express');

const app = express();
app.use(express.json());
app.use(cors());

const Storage = multer.diskStorage({
    destination:"./public/",
    filename:(req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage: Storage }).single('file')

app.post("/signup", async (req,res)=>{
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
})

app.post('/login', async(req,res)=>{
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
})

app.post('/add-product',upload,verifyToken, async (req,res)=>{
    let product = new Product({
        name:req.body.name.toLowerCase(),
        price:req.body.price.toLowerCase(),
        category:req.body.category.toLowerCase(),
        company:req.body.company.toLowerCase(),
        image:req.file.filename
    });
    let result = await product.save();
    res.send(result)
})

app.get('/getAllProducts', verifyToken, async(req,res)=>{
    let data = await Product.find();
    if(data.length>0){
        res.send(data);
    }else{
        res.status(404).send({result:"No Product Found"})
    }
})

app.delete('/delete-product/:id', verifyToken, async (req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id});
    res.send(result);
})

app.get('/product/:id', verifyToken, async (req,res)=>{
    const result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }else{
        res.status(404).send({result:"No Record Found"});
    }
})

app.put('/updateProduct/:id', upload, verifyToken, async(req,res)=>{
    if(req.file){
        const result = await Product.updateOne(
            {_id:req.params.id},
            {$set:{ 
                name:req.body.name.toLowerCase(),
                price:req.body.price.toLowerCase(),
                category:req.body.category.toLowerCase(),
                company:req.body.company.toLowerCase(),
                image:req.file.filename}}
        )
        if(result){
            res.send(result);
        }
        else{
            res.status(404).send({result:"No Record Found"});
        }
    }
    else{
        const result = await Product.updateOne(
            {_id:req.params.id},
            {$set:{ 
                name:req.body.name.toLowerCase(),
                price:req.body.price.toLowerCase(),
                category:req.body.category.toLowerCase(),
                company:req.body.company.toLowerCase(),
            }}
        )
        if(result){
            res.send(result);
        }
        else{
            res.status(404).send({result:"No Record Found"});
        }
    }
})

app.get('/search/:key' , verifyToken ,async (req,res)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key.toLowerCase()}},
            {company:{$regex:req.params.key.toLowerCase()}}
        ]
    })
    res.send(result)
})

function verifyToken(req,res,next){
    const token = req.headers['authorization'];
    if(token){
        Jwt.verify(token,jwtkey, (err,valid)=>{
            if(err){
                res.status(401).send("Please provide valid token");
            }else{
               next();
            }
        })
    }else{
        res.status(403).send("Please add token with Headers")
    }
    
}

app.listen(5000);