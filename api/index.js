const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const userRouter=require('./routes/userRoute');
const authRouter=require('./routes/authRoute');
const path=require('path');
dotenv.config()


// mongoose.connect(`${process.env.MONGO}`).then(()=>console.log('database connected')).catch((e)=>{console.log(e)})
mongoose.connect(`${process.env.MONGO}`).then(() => {
  console.log('Database connected');
}).catch((error) => {
  console.error('Error connecting to database:', error);
});

const app=express();
app.use(express.json())               // this will allow  us to send json to the server
const cors= require('cors');

app.use(cors());
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.use(express.static(path.join(__dirname, './public')));






app.listen(3000,()=>{
})