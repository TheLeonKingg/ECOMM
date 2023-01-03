const cartItem = require('../../../db/cartProduct');

module.exports.deleteCartProduct =  async (req,res)=>{
    let item = await cartItem.findOne({_id:req.params.id});
    if(item.quantity<2){
        const result = await cartItem.deleteOne({_id:req.params.id});
        res.send(result);
    }
    else{
        const quantity = item.quantity - req.params.quantity;
        const totalPrice = item.totalPrice - item.perProductPrice * req.params.quantity;
        const result = await cartItem.updateOne(
            {_id:req.params.id},
            {$set:{ 
                name:item.name.toLowerCase(),
                quantity: quantity,
                perProductPrice:item.perProductPrice,
                totalPrice : totalPrice,
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