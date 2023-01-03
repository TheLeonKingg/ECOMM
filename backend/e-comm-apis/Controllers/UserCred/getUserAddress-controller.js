const address = require('../../../db/userAddress');

module.exports.getUserAddress = async (req,res)=>{
    const result = await address.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }else{
        res.status(404).send({result:"No Record Found"});
    }
}