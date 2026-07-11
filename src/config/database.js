const mongoose = require('mongoose');

const uri = "mongodb+srv://rajnish25acin:rajnish25acin123@namastedev.ztmaek4.mongodb.net/dveTinder";

const connectDB = async ()=>{
    try{
        await mongoose.connect(uri)
    }
    catch(err){
        console.error("Error connecting to the database",err);
    
    }
}



module.exports = connectDB;