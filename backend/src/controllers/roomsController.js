const RoomManger = require("../serviceClass/roomsService");

const RoomMangerinstance=new RoomManger()
function createRoom(req,res){
    const roomName=req.body;
    const userId=req.userId;
    const room=RoomMangerinstance.createRoom(userId,roomName)
    return room.id?room.id:room


}
function addUserToRoom(req,res){
    const roomId=req.roomId;
    const userId=req.userId;
    const room=RoomMangerinstance.addMember(userId,roomId)
}
module.exports = createRoom