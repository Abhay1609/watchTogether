const { Router } = require("express");
const verifyToken = require("../middleware/authmiddleware");
const {createRoom,addUserToRoom} = require("../controllers/roomsController");



const roomRouter=Router()


roomRouter.post('/createRoom',(req,res,next)=>verifyToken(req,res,next),(req,res)=>createRoom(req,res))
roomRouter.post('/addUser',(req,res,next)=>verifyToken(req,res,next),(req,res)=>addUserToRoom(req,res))
module.exports=roomRouter