const mongoose = require('mongoose')

const cartProductSchema = new mongoose.Schema({
    name:String,
    perProductPrice:Number,
    category:String,
    company:String,
    image:String,
    quantity:Number,
    totalPrice: Number

})

module.exports = mongoose.model('cart',cartProductSchema);