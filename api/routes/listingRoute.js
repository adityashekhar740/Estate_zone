const express=require('express');
const { createListing,showListings, deleteListing,GetListing, UpdateListing } = require('../controllers/listing.controller');
const verifyToken = require('../utils/verifyToken');
const router=express.Router();


router.post('/create',createListing);
router.get('/listings/:id',verifyToken,showListings);
router.delete('/delete/:id',verifyToken,deleteListing);
router.get('/GetListing/:id',GetListing);
router.post('/update/:id',UpdateListing);


module.exports=router;