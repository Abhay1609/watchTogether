
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
            return {"message":"User Not found"}
        }
        if(!room){
            return {"message":"Room Not found"}
        }

        const newRoomData={
            roomName,
            admin,
            members:[admin],
            history:[],
            chat:[],
            status:false,
            currentTime:'0',
            currentVideo:{},
        }
        const newRoom=new Rooms(newRoomData);
        try{

            const saveRoom=await newRoom.save();
            return saveRoom
        }
        catch(error){
            return error
        }



    }
    async isUserInRoom(roomId,userId){
        const room=await Rooms.findOne({
            _id:roomId,
            members:{$in:[userId]}
        }

        )
        return room;
    }
    async addMember(roomId,userId){
    
        if(this.isUserInRoom(roomId,userId)){
            return {"message":"User is not in Room"}
        }
        try{
        const room=await Rooms.findByIdAndUpdate(
           { _id:roomId},
           {$push:{members:userId}},
           {new :true}

        )
        if(room){
            return room
        }
        else{
            return {"message":"Internal Server Error"}
        }}
        catch(err){
            return err
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