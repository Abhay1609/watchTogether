
const WebSocketServer=require('websocket').server;
const app = require('./routes/routes.js');
const http = require('http');
require('dotenv').config();
const connectDB=require('./dB/dbConnection.js');
const socketHandler = require('./socket.js');
const port=process.env.PORT||8000
const server = http.createServer(app);

connectDB()
.then(()=>{

    server.listen(port,()=>{
        console.log("Server Start ....");
        
     
    })
    
    const wsServer = new WebSocketServer({
        httpServer:server
    });
    wsServer.on('request',(request)=>{
        socketHandler(request)})
  
    module.exports = wsServer;


})
.catch((err)=>{
    console.log("MONGO db connect failed",err)
})

