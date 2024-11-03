

const wsServer=require('./index');
const messageEnum = require('./message');
const RoomManger = require('./serviceClass/roomsService');
const UserManagement = require('./serviceClass/userService');
const VideoPlayerManger = require('./serviceClass/videoPlayersService');

const UserManagementinstance=new UserManagement();
const RoomMangerinstance=new RoomManger();
const VideoPlayerMangerinstance=new VideoPlayerManger();

const socketHandler=(request)=>{
    console.log("yes")
    const connection=request.accept(null,request.origin);
    console.log("A new Client connected");
    connection.on('message',(message)=>{
   

        if(message.type=="utf8"){
            try{
                const data=JSON.parse(message.utf8Data);
                switch(data.type){
                    case messageEnum.createUser:
                        // UserManagementinstance.addUser(data.name,data.password,connection)
                       
                        break
                    case messageEnum.createRoom:
                        // RoomMangerinstance.createRoom(data.userId,data.roomName)
                        break
                    case messageEnum.addUserRoom:
                        break
                    case messageEnum.playVideo:
                        break
                    case messageEnum.resumeVideo:
                        break
                    case messageEnum.stopVidedo:
                        break
                    case messageEnum.leaveRoom:
                        break
                }

            }catch(err){
                return err
            }
        }
       
    })

}
module.exports=socketHandler