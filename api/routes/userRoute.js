const express=require('express');
const { test, uploadimg } = require('../controllers/user.controller');
const router=express.Router();
const upload = require('./multer')
router.get('/test',test);
router.post('/upload',upload.single('image'),uploadimg)


module.exports = router;