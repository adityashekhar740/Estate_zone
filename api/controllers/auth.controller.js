const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10); // here 10 is salt no. means no.of times salt no is combined with original pasword
  const newUser = userModel.create({
    username,
    email,
    password: hashedPassword,
  });
  try {
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json("Unable to Register");
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;
  const validateUser = await userModel.findOne({ username });
  if (!validateUser) {
    return res.status(404).json("User not found");
  }

  const validatePassword = bcrypt.compareSync(password, validateUser.password);
  if (!validatePassword) {
    return res.status(401).json("Wrong Credentials");
  }
  const token = jwt.sign({ id: validateUser._id }, `${process.env.JWT_SECRET}`);
  const { password: pass, ...rest } = validateUser._doc; //we have taken out the password not to show to client
  res
    .cookie("access_token", token, {
      httpOnly: true,

    })
    .status(200)
    .json(rest);
  //httponly is used for so that onyl http reQ can handle token and have acceesss no other
};

const google = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new userModel({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        password: hashedPassword,
        email: req.body.email,
        avatar: req.body.photo,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

const logout = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json("Logged Out");
};

const getCookie=(req,res)=>{
 try{
   const token=req.cookies.access_token;
   if(!token)res.status(401).json('unauthorized');
  res.status(200).json({access_token:token});
 }
 catch(e){
  res.status(500).json('INTERNAL SERVER ERROR');
 }

  }

module.exports = { signup, signin, google, logout,getCookie};
