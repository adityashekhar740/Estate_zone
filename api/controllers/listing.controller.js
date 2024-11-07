const Listing = require("../models/listing");
const UserModel= require("../models/user");
const nodemailer=require("nodemailer");
const dotenv=require('dotenv');
dotenv.config();

const createListing=async(req,res)=>{
    console.log(req.body)
    try{
        const listing=await Listing.create(req.body)
        res.status(201).json(listing);
    }
    catch(e){
        console.log(e)
        res.status(400).json('not able to create listing');
    }
}

const showListings=async(req,res)=>{
    if(req.user.id!==req.params.id){
        res.status( 403).json("You are not authorized");
    }
    else{
        const listings=await Listing.find({userRef: req.params.id});
        res.status(201).json(listings);
    }
}

const deleteListing=async(req,res)=>{
    const listing=await Listing.findById({_id:req.params.id})
    if(!listing){return res.status(400).json("No such Listing exists.")}
    if(req.user.id!==listing.userRef){
        return res.status(403).json('you can only delete your own listing');
    }
    const deletedListing=await Listing.findByIdAndDelete({_id:req.params.id})
    res.status(200).json(deletedListing);
}

const GetListing=async(req,res)=>{
    const listing=await Listing.findById({_id:req.params.id});
    if(!listing){
        return res.status(400).json('The listing you want to edit does not exist');          
    }
   
    res.status(200).send(listing);
}

const UpdateListing=async(req,res)=>{
    const listing=await Listing.findById({_id:req.params.id});
    if(!listing){
        res.status(404).json('No Listing found');
        return;
    }

    else{
        if(listing.userRef!==req.user.id){
            res.status(403).json('You can only  update your own listing');
            return;
        }
        try{
            const updatedListing=await Listing.findByIdAndUpdate({_id:req.params.id},
                req.body,
                {new:true}
                )
                res.status(200).json(updatedListing);
        }
        catch(e){
            res.status(500).json('not able to update user');
        }
    }
}

const sendMsg= async(req,res)=>{
    const {msg,sender}=req.body;
    const listing=await Listing.findById({_id:req.params.id});
    const receiver=await UserModel.findById({_id:listing.userRef});

     const transporter=nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
    secure: true,
        auth:{
            user:`shekharaditya740@gmail.com`,
            pass:`${process.env.MAIL_PASS}`
        }
    })

    let mailOptions={
        from:`shekharaditya740@gmail.com`,
        to:`${receiver.email}`,
        subject:`${sender} on Estatezone is interested in your property and want to make a deal`,
        text:`${msg}`
    }
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            return console.log(err);
        }
        console.log('msg sent');
    })
   
   
}

const showRecentListings=async(req,res)=>{
    try{
        const allListings=await Listing.find().sort({createdAt:-1}).limit(3);
    res.status(200).json(allListings);
   
    }
    catch(e){
        console.log(e);
        res.status(500).json("not able to show recent Listings");
    }
}

const showAllListings=async(req,res)=>{
    try{
        const listings=await Listing.find().sort({createdAt:-1});
    if(!listings){
        return res.status(200).json('Currently no listings to show');
    }
    res.status(200).json(listings);                            
    }
    catch(e){
        res.status(500).json('Internal Server Errorrrrr');
    }
}


module.exports={createListing,showListings,deleteListing,GetListing,UpdateListing,sendMsg,showRecentListings,showAllListings}