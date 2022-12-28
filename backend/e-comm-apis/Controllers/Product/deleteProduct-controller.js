const Product = require('../../../db/product');

module.exports.deleteProduct =  async (req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id});
    res.send(result);
}