const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const userRouter=require('./routes/userRoute');
const authRouter=require('./routes/authRoute');
dotenv.config()

mongoose.connect(`${process.env.MONGO}`)
const app=express();
app.use(express.json())               // this will allow  us to send json to the server

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);


app.listen(3000,()=>{
})