const jwt=require("jsonwebtoken")

const verifyJwt=(req,res,next)=>{
    const authentication=req.headers.authentication
    if (!authentication){
        return res.status(401).json({message:"please sign in to proceed"})
    }

    const token=authentication.replace("Bearer ","" ).trim()
    jwt.verify(token,"12345",(error,user)=>{
        if (error){
            return res.status(403).json({message:"Fail to authenticate"})
        }

        req.user=user
        next()
    })
}

module.exports=verifyJwt