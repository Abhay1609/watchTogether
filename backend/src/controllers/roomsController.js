const RoomManger = require("../serviceClass/roomsService");

const RoomMangerinstance=new RoomManger()
async function createRoom(req,res){
    const roomName=req.body.roomName;
    const userId=req.userId;

    const room=await RoomMangerinstance.createRoom(userId,roomName)
    if(room.statusCode===200){
        res.send({"message":room.message._id})
    }else{
        res.send(room)
    }
    


}
async function addUserToRoom(req,res){
    const roomId=req.body.roomId;
    const userId=req.userId;
    console.log(roomId,userId)
    const room=await RoomMangerinstance.addMember(roomId,userId)
    
    res.send(room)
}
module.exports = {createRoom,addUserToRoom}