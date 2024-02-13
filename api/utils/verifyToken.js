const jwt=require('jsonwebtoken');
const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token) return res.status(401).json('USER UNAUTHORIZED');
    jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
        if(error)res.status(403).json('forbidden token')
        req.user=user;
    next();
    })
}

module.exports=verifyToken;


