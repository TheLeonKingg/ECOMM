const Product = require('../../../db/product');

module.exports.addProduct =  async (req,res)=>{
    let product = new Product({
        name:req.body.name.toLowerCase(),
        price:req.body.price.toLowerCase(),
        category:req.body.category.toLowerCase(),
        company:req.body.company.toLowerCase(),
        image:req.file.filename
    });
    let result = await product.save();
    res.send(result)
}