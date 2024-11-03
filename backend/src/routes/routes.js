

const express = require('express');
const cors=require('cors')
const cookieParser=require('cookie-parser')
const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

const userRouter=require('./userRoutes');
const roomRouter = require('./roomsRoutes');
app.use("/api/v1/users",userRouter)
app.use("/api/v1/rooms",roomRouter)


module.exports = app; 

