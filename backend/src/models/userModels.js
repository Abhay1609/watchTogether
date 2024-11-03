
const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;