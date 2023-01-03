const mongoose = require('mongoose')


const userAddressSchema = new mongoose.Schema({
    name:String,
    address:String,
    pinCode:Number,
    city:String,
    state:String,
    country:String
})

module.exports = mongoose.model('address',userAddressSchema);