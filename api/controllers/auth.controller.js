const user = require("../models/user");
const bcrypt=require('bcryptjs');

const signup=async (req,res)=>{
const {username,email,password}=req.body;
const hashedPassword=bcrypt.hashSync(password,10);       // here 10 is salt no. means no.of times salt no is combined with original pasword
const newUser=new user({
    username,email,password:hashedPassword
})
try{
    await newUser.save();
    res.status(201).json(newUser);
}
catch(error){
    res.status(500).json(error.message);
}

}


module.exports={signup};