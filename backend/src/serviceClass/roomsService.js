
const { default: mongoose } = require("mongoose");
const User=require("../models/userModels.js");
const Rooms=require("../models/roomsModels.js")
class RoomManger{
    constructor(){

    }

    async createRoom(userId,roomName){
        const user=await User.findById(userId);
        const room=await Rooms.find({roomName:roomName})
        if(!user){
            return {statusCode:404,"message":"User Not found"}
        }
        
        if(room.length){
            console.log(room,user,userId)
            return {statusCode:404,"message":"Room already present"}
        }

        const newRoomData={
            roomName,
            admin:userId,
            members:[userId],
            history:[],
            chat:[],
            status:false,
            currentTime:'0',
            currentVideo:{},
        }
        const newRoom=new Rooms(newRoomData);
        try{

            const saveRoom=await newRoom.save();
            return {statusCode:200,message:saveRoom}
        }
        catch(error){
            return {statusCode:500,message:error}
        }



    }
    async isUserInRoom(roomId,userId){
        console.log(userId,roomId)
        const room=await Rooms.findOne({
            _id:roomId,
            members:{$in:[userId]}
        }
       

        )
  
        return room;
    }
    async addMember(roomId,userId){
        const room=await this.isUserInRoom(roomId,userId)
       
        if(room){
            return {statusCode:200,"message":room}
        }
        try{
        const room=await Rooms.findByIdAndUpdate(
           { _id:roomId},
           {$push:{members:userId}},
           {new :true}

        )
        if(room){
            return {statusCode:200,message:room}
        }
        else{
            return {statusCode:500,"message":"Internal Server Error"}
        }}
        catch(err){
            return {statusCode:500,message:err}
        }
        

    }
    async removeMember(roomId,userId){
        if(!this.isUserInRoom(roomId,userId)){
            return
        };
        try{
        const room=await Rooms.findByIdAndUpdate(
            {_id:roomId},
            {$pull:{members:userId}},
            {new:true}
        );
        if(room){
            return
        }else{
            return 'error'
        }
    
    }
        catch(err){
            return err
        }
    }

    
}
module.exports = RoomManger