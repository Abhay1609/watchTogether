const mongoose = require("mongoose");


const connectDB = async () => {
    try {
   
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/videoUser`);
        console.log("mongo connection successfully", connectionInstance.connection.host);
    } catch (error) {
        console.log("mongoose failed", error);
        process.exit(1);
    }
};


module.exports=connectDB