const Product = require('../../../db/product');


module.exports.getSingleProducts = async (req,res)=>{
    const result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }else{
        res.status(404).send({result:"No Record Found"});
    }
}