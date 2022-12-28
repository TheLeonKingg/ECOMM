const Product = require('../../../db/product');


module.exports.getAllProducts = async(req,res)=>{
    let data = await Product.find();
    if(data.length>0){
        res.send(data);
    }else{
        res.status(404).send({result:"No Product Found"})
    }
}