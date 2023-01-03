const Product = require('../../../db/product');

module.exports.addProduct = async (req, res) => {
    let productName = await Product.findOne({name: req.body.name.toLowerCase()});
    if (productName) {
        res.send({
            data: [],
            success: false,
            msg: "Cannot add product with same Product Name"
        })
    } else {
        let product = new Product({
            name: req.body.name.toLowerCase(),
            quantity:req.body.quantity,
            price: req.body.price.toLowerCase(),
            category: req.body.category.toLowerCase(),
            company: req.body.company.toLowerCase(),
            image: req.file.filename
        });
        let result = await product.save();
        res.send(result);
    }
}