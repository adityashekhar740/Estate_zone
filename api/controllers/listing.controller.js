const Listing = require("../models/listing")

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
    if(req.user.id!==listing.userRef){
        return res.status(403).json('You can only edit your  own listing');
    }
    res.status(200).send(listing);
}

module.exports={createListing,showListings,deleteListing,GetListing}