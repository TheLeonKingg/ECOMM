const Product = require('../../../db/product');

module.exports.deleteProduct =  async (req,res)=>{
    let item = await Product.findOne({_id:req.params.id});
    if(item.quantity<2){
        const result = await Product.deleteOne({_id:req.params.id});
        res.send(result);
    }
    else{
        const quantity = item.quantity - req.params.quantity;
        const result = await Product.updateOne(
            {_id:req.params.id},
            {$set:{ 
                name:item.name.toLowerCase(),
                quantity: quantity,
                price:item.price,
                category:item.category.toLowerCase(),
                company:item.company.toLowerCase(),
                image:item.filename}}
        )
        if(result){
            res.send(result);
        }
        else{
            res.status(404).send({result:"No Record Found"});
        }
    }
}