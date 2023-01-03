const address = require('../../../db/userAddress');
const { validationResult } = require('express-validator'); 

module.exports.updateUserAddress = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const result = await address.updateOne(
        { _id: req.params.id },
        {
            $set: {
                name: req.body.name.toLowerCase(),
                address: req.body.address.toLowerCase(),
                pinCode: req.body.pinCode,
                city: req.body.city.toLowerCase(),
                state: req.body.state.toLowerCase(),
                country: req.body.country.toLowerCase(),
            }
        }
    )
    if(result){
        res.send(result);
    }
    else{
        res.status(404).send({result:"No Record Found"});
    }
}