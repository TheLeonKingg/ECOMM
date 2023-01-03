const cartProduct = require('../../../db/cartProduct');

module.exports.addProductToCart = async (req, res) => {
    if (req.body.quantity > 1) {
        let cart = new cartProduct({
            quantity: req.body.quantity,
            name: req.body.name.toLowerCase(),
            totalPrice: req.body.perProductPrice * req.body.quantity,
            perProductPrice:req.body.perProductPrice,
            category: req.body.category.toLowerCase(),
            company: req.body.company.toLowerCase(),
            image: req.file.filename
        });
        let result = await cart.save();
        res.send(result);
    }
    else{
        let cart = new cartProduct({
            quantity:req.body.quantity,
            name: req.body.name.toLowerCase(),
            totalPrice: req.body.perProductPrice,
            perProductPrice:req.body.perProductPrice,
            category: req.body.category.toLowerCase(),
            company: req.body.company.toLowerCase(),
            image: req.file.filename
        });
        let result = await cart.save();
        res.send(result);
    }

}