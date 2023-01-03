const address = require('../../../db/userAddress');
const { validationResult } = require('express-validator'); 

module.exports.userAddress = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
     }
    let userAddress = new address({
        name: req.body.name.toLowerCase(),
        address: req.body.address.toLowerCase(),
        pinCode: req.body.pinCode,
        city:req.body.city.toLowerCase(),
        state:req.body.state.toLowerCase(),
        country:req.body.country.toLowerCase(),
    });

    let result = await userAddress.save();
    res.send(result);
}