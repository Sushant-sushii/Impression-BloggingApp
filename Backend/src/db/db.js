const mongoose=require("mongoose");
const {exit}=require ("node:process")


async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            dbName: 'Mars'
        });
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.error("Error connecting to database:", err);
        exit(1);
    }
}

module.exports=connectDB;