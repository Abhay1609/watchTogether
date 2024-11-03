

const mongoose=require("mongoose");
const User=require("../models/userModels")

const roomsSchema=new mongoose.Schema({
    roomName:{
        type:String,
        required:true,
        trim:true
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true

    },
    members:
        [{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            
        }]
           

    ,
    history:[{
        player:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        video:{
            type:String,
        }

    }],
    chat:[{
        member:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        message:{
            type:String
        },
        created:{
            type:Date,
            default:Date.now(),
        }

    }],
    status:{
        type:Boolean,
        default:true
    },
    currentTime:{
        type:String


    },
    currentVideo:{
        video:{
            type:String
        },
        player:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        }


    }
})

const Rooms=mongoose.model('Rooms',roomsSchema)
module.exports=Rooms;