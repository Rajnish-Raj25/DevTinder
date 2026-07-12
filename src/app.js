 const  express = require('express');
const connectDB = require('./config/database');
  const User = require("./models/user");
 const app =express();
 
 app.use(express.json());


app.post("/signUp", async (req, res) => {


    const newUser = new User(req.body);

   

try{
     await newUser.save();
     res.status(201).json({ message: "User created successfully" });
}catch(err){
     res.status(500).json({ "error on save": err.message });
}
});



connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(3000,()=>{
    console.log('Server is running on port 3000');
 })
}).catch((err)=>{
    console.error("Error connecting to the database",err);

})

 