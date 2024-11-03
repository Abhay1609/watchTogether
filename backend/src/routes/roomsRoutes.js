const { Router } = require("express");
const verifyToken = require("../middleware/authmiddleware");
const createRoom = require("../controllers/roomsController");


const roomRouter=Router()


roomRouter.post('/createRoom',verifyToken,(req,res)=>createRoom(req,res))
module.exports=roomRouter