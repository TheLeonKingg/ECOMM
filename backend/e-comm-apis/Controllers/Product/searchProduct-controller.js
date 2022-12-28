const Product = require('../../../db/product');

module.exports.searchProduct = async (req,res)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key.toLowerCase()}},
            {company:{$regex:req.params.key.toLowerCase()}}
        ]
    })
    res.send(result)
}