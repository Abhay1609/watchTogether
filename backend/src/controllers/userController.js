const UserManagement=require('../serviceClass/userService')
const jwt=require("jsonwebtoken")
const userMangementinstance=new UserManagement()
async function createUser(req,res){
    const {name,password}=req.body;
    const saveUser=await userMangementinstance.addUser(name,password)

    if(saveUser.statusCode===200){
    const token=jwt.sign({id:saveUser.message._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
    res.cookie('authToken',token,{
        httpOnly:true,
        secure:true,

    })
    res.json({"message":"User Created"})}
    else{
        res.json(saveUser)
    }

    
}
async function loginUser(req,res){
    const {name,password}=req.body;
    const authenticateUser= await userMangementinstance.loginUser(name,password);
    console.log(authenticateUser)
    if(!authenticateUser){
        return res.json({"statusCode":201,"message":"Username or password invalid"})
    }
    console.log("authenticate user id",authenticateUser._id,authenticateUser)
    const token=jwt.sign({id:authenticateUser._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
    console.log(token)
    res.cookie('authToken',token,{
        httpOnly:true,
        secure:true
    })
    res.json({"statusCode":200,"message":"Login Successfully"})


}
module.exports = {
    createUser,
    loginUser
};