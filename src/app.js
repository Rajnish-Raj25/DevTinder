 const  express = require('express');
const connectDB = require('./config/database');
  const User = require("./models/user");
 const app =express();
 


app.post("/signUp", async (req, res) => {
    const {firstName,lastName,email,password,age,gender} = req.query;
    const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        age,
        gender
    });

   

try{
     await newUser.save()
     res.status(201).json({ message: "User created successfully" });
}catch(err){
     res.status(500).json({ "error on save": err.message });ß
}
});


app.get("/getUser",(req,res)=>{
    const alluser = User.find()
    .then((users) => {
        res.status(200).json(users);
    })
    .catch((err) => {
        res.status(500).json({ error: err.message });
    });
})

connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(3000,()=>{
    console.log('Server is running on port 3000');
 })
}).catch((err)=>{
    console.error("Error connecting to the database",err);

})

 