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

module.exports={createListing}