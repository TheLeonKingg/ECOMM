const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    company:String,
    image:String
})

module.exports = mongoose.model('product',productSchema);