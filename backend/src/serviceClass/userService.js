

const messageEnum = require("../message.js")
const User=require("../models/userModels.js")

class UserManagement{
    constructor(){

    }

     async addUser(name,password){
        const existinguser=await User.findOne({name:name})
        if(existinguser){
            return conn.send("User already exist")
        }
        const newUser=new User({
            name,
            password
        })
        
     
        try{
            const saveUser=await newUser.save();
            if(saveUser){
               return saveUser
            }else{
            return "error"}
        }
        catch(error){
            return error
        }

     }
     async loginUser(name,password){
        const authenticateUser=await User.findOne({
            name,
            password
        })
      return authenticateUser
     }



}
module.exports = UserManagement