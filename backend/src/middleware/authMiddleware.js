const User = require("../models/userModels");



async function verifyToken(req,res,next){
    try{
        const token=req.cookies?.authToken || req.header("Authorization")?.replace("Bearer","");
        if(!token){
            return res.json({"message":"Authorization Error"});
        }
        const decodeToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findById(decodeToken?.id).select('-password');
        if(!user){
            return res.json({"message":"Authorization Error"});
        }
        req.userId=user._id;
        next()

    }catch(error){
        return error
    }

}

module.exports=verifyToken