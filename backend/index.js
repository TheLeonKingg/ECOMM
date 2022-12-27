const express = require('express');
const cors = require('cors')
const multer  = require('multer')
const path = require('path');
require('./db/config');
const User = require('./db/users');
const Product = require('./db/product')

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
    res.send(result);
})

app.post('/login', async(req,res)=>{
    if(req.body.email && req.body.password){
        let loginData = {
            email:req.body.email.toLowerCase(),
            password:req.body.password
        }

        let user = await User.findOne(loginData).select("-password");
        if(user){
            res.send(user)
        }else{
            res.send({result:'User Not Found'})
        }
    }
    else{
        res.send({result:'User Not Found'})
    }
})

app.post('/add-product',upload, async (req,res)=>{
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

app.get('/getAllProducts', async(req,res)=>{
    let data = await Product.find();
    if(data.length>0){
        res.send(data);
    }else{
        res.send({result:"No Product Found"})
    }
})

app.delete('/delete-product/:id', async (req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id});
    res.send(result);
})

app.get('/product/:id', async (req,res)=>{
    const result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }else{
        res.send({result:"No Record Found"});
    }
})

app.put('/updateProduct/:id', upload, async(req,res)=>{
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
            res.send({result:"No Record Found"});
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
            res.send({result:"No Record Found"});
        }
    }
})

app.get('/search/:key' , async (req,res)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key.toLowerCase()}},
            {company:{$regex:req.params.key.toLowerCase()}}
        ]
    })
    res.send(result)
})

app.listen(5000);