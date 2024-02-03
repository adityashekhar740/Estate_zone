const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv')
dotenv.config()

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10); // here 10 is salt no. means no.of times salt no is combined with original pasword
  const newUser = new userModel({
    username,
    email,
    password:hashedPassword,
  });
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json('Unable to Register');
  }
};

const signin= async(req,res)=>{
  const {username,password}=req.body
  const validateUser=await userModel.findOne({username})
  if(!validateUser){
   return res.status(404).json('User not found');
  }

    const validatePassword= bcrypt.compareSync(password,validateUser.password);
  if(!validatePassword){
   return res.status(401).json('Wrong Credentials');    
  }
  const token = jwt.sign({id:validateUser._id},`${process.env.JWT_SECRET}`);
  const {password:pass,...rest}=validateUser._doc;                        //we have taken out the password not to show to client 
  res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);       
  //httponly is used for so that onyl http reQ can handle token and have acceesss no other
  
}

module.exports = { signup,signin };



