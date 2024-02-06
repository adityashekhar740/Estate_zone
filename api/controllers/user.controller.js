 
 const test=(req,res)=>{
    res.json({
        msg:'heyya'
    })
}

const uploadimg=(req,res)=>{

    res.json(req.file.filename)

}

module.exports={test,uploadimg}