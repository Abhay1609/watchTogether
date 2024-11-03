const UserManagement=require('../serviceClass/userService')
const jwt=require("jsonwebtoken")
const userMangementinstance=new UserManagement()
function createUser(req,res){
    const {name,password}=req.body;
    const saveUser=userMangementinstance.addUser(name,password)
    const token=jwt.sign({id:saveUser._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
    res.cookie('authToken',token,{
        httpOnly:true,
        secure:true,

    })
    res.json({"message":"User Created"})

    
}
function loginUser(req,res){
    const {name,password}=req.body;
    const authenticateUser=userMangementinstance.loginUser(name,password);
    if(!authenticateUser){
        return res.json({"message":"Username or password invalid"})
    }
    const token=jwt.sign({id:authenticateUser._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
    res.cookie('authToken',token,{
        httpOnly:true,
        secure:true
    })
    res.json({"message":"Login Successfully"})


}
module.exports=createUser
module.exports=loginUser