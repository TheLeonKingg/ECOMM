const User = require('../../../db/users');

module.exports.deleteUser = async (req,res)=>{
    const result = await User.deleteOne({_id:req.params.id});
    res.send(result);
}
