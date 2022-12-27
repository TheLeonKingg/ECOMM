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
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post('/login', async(req,res)=>{
    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select("-password");
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
        name:req.body.name,
        price:req.body.price,
        category:req.body.category,
        company:req.body.company,
        image:req.file.filename
    });
    let result = await product.save();
    res.send(result)
})

app.get('/getAllProducts', async(req,res)=>{
    let data = await Product.find();
    res.send(data);
})

app.listen(5000);