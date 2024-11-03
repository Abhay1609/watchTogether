

const RoomManger=require('./roomsService')
const Rooms = require('../models/roomsModels')
const RoomMangerinstance=new RoomManger()
class VideoPlayerManger{
    constructor(){

    }
    async playVideo(roomId,userId,video){
        if(!RoomMangerinstance.isUserInRoom(roomId,userId)){
            return
        }
        const newVideo={
            player:userId,
            video:video
        }
        try{
        const room=await Rooms.findByIdAndUpdate(
            {_id:roomId},
            {
                $push:{history:newVideo},
                $set:{currentVideo:newVideo}
            },
            {
                new:true,runValidators:true
            }


        )
    if(room){
        return 
    }
    else{
        return "error"
    }
}
        catch(err){
            return err
        }

    }

    async resume(roomId,userId){
        if(!RoomMangerinstance.isUserInRoom(roomId,userId)){
            return
        }
        try{
            const room=await Rooms.findByIdAndUpdate(
                {_id:roomId},
                {$set:{status:true}},
                {new:true}
                
            )
            if(room){return}
            else{return 'erro'}
        }catch(err){
            return err
        }
    }
    async stop(roomId,userId){
        if(!RoomMangerinstance.isUserInRoom(roomId,userId)){
            return

        }
        try{
            const room=await Rooms.findByIdAndUpdate(
                {_id:roomId},
                {$set:{status:false}},
                {new:true}
            )
            if(room){return}
            else{return 'erro'}
        }
        catch(err){
            return err
        }

    }
}
module.exports = VideoPlayerManger