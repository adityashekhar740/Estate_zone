const express=require('express');
const { createListing,showListings, deleteListing,GetListing, UpdateListing , sendMsg,showRecentListings} = require('../controllers/listing.controller');
const verifyToken = require('../utils/verifyToken');
const router=express.Router();


router.post('/create',createListing);
router.get('/listings/:id',verifyToken,showListings);
router.delete('/delete/:id',verifyToken,deleteListing);
router.get('/GetListing/:id',GetListing);
router.post('/update/:id',verifyToken,UpdateListing);
router.post('/sendMsg/:id',verifyToken,sendMsg);
router.get('/recentListings',showRecentListings);


module.exports=router;