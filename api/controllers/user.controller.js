 const bcryptjs = require('bcryptjs');
const user = require('../models/user');
 const test=(req,res)=>{
    res.json({
        msg:'heyya'
    })
}

const uploadimg=(req,res)=>{

    res.json(req.file.filename)

}

const updateUser=async(req,res,next)=>{
    if(req.user.id!==req.params.id)return res.status(401).json('you can only update your own account')
    
    try{
        if(req.body.password){
        req.body.passowrd=bcryptjs.hashSync(req.body.password,10);
    }
        const updatedUser=await user.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            password:req.body.passowrd,
            email:req.body.email,
            avatar:req.body.avatar
        },
    },{new:true})
    const {passowrd,...rest}=updatedUser._doc;
    res.status(200).json(rest);
    }
    catch(error){
        res.status(500).json('Unable to update user');
    }
}

const deleteUser=async(req,res)=>{
    if(req.user.id!==req.params.id){
        res.status(401).json('You can only delete your own account');
    }
   try{
    res.clearCookie('access_token')
     await user.findByIdAndDelete(req.params.id);
     return res.status(200).json('Account has been deleted')
   }
   catch(e){
    res.status(500).json('some error occurred while account deletion')
   }
}


module.exports={test,uploadimg,updateUser,deleteUser}