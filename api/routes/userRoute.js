const express=require('express');
const { test, uploadimg,updateUser, deleteUser } = require('../controllers/user.controller');
const router=express.Router();
const upload = require('./multer');
const verifyToken = require('../utils/verifyToken');
router.get('/test',test);
router.post('/upload',upload.single('image'),uploadimg)
router.post('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser)

module.exports = router;