const User = require("../models/userModels");
const jwt=require("jsonwebtoken")


async function verifyToken(req,res,next){
    try{
        const token=req.cookies?.authToken || req.header("Authorization")?.replace("Bearer","");
        console.log("here",token)
        if(!token){
            return res.json({"message":"Authorization Error"});
        }

        const decodeToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        console.log("Decode Token",decodeToken)
        const user=await User.findById(decodeToken?.id).select('-password');
        
        if(!user){
            return res.json({"message":"Authorization Error"});
        }
        req.userId=decodeToken.id;
        next()

    }catch(error){
        return error
    }

}

module.exports=verifyToken