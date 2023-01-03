const Product = require('../../../db/product');

module.exports.updateProduct =  async(req,res)=>{
    if(req.file){
        const result = await Product.updateOne(
            {_id:req.params.id},
            {$set:{ 
                name:req.body.name.toLowerCase(),
                quantity:req.body.quantity,
                price:req.body.price,
                category:req.body.category.toLowerCase(),
                company:req.body.company.toLowerCase(),
                image:req.file.filename}}
        )
        if(result){
            res.send(result);
        }
        else{
            res.status(404).send({result:"No Record Found"});
        }
    }
    else{
        const result = await Product.updateOne(
            {_id:req.params.id},
            {$set:{ 
                name:req.body.name.toLowerCase(),
                quantity:req.body.quantity,
                price:req.body.price,
                category:req.body.category.toLowerCase(),
                company:req.body.company.toLowerCase(),
            }}
        )
        if(result){
            res.send(result);
        }
        else{
            res.status(404).send({result:"No Record Found"});
        }
    }
}