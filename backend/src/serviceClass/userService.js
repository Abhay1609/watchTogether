

const e = require("express")
const messageEnum = require("../message.js")
const User=require("../models/userModels.js")

class UserManagement{
    constructor(){

    }

     async addUser(name,password){
        const existinguser=await User.findOne({name:name})
        if(existinguser){
            return { "statusCode":505,"message":"User already Exist"}
        }
        const newUser=new User({
            name,
            password
        })
        
     
        try{
            const saveUser=await newUser.save();
            if(saveUser){
               return {"statusCode":200,"message":saveUser}
            }else{
            return {"statusCode":505,"message":"error"} }
        }
        catch(error){
            return {"statusCode":505,"message":error}
        }

     }
     async loginUser(name,password){
        console.log(name,password,"login")
        const authenticateUser=await User.findOne({
            name,
            password
        })
      return authenticateUser
     }



}
module.exports = UserManagement