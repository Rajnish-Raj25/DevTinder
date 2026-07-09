 const  express = require('express');
 const {adminAuth,userAuth} = require("./middleware/auth");
 const app =express();

 app.use("/admin",adminAuth);
 app.get("/admin/getAll",(req,res)=>{
    res.send("Welcome to the admin panel");
 })

 app.post("/admin/create",(req,res)=>{
    res.send("Admin created successfully");
 })
app.get("/user",userAuth,(req,res)=>{
    res.send("Welcome to the user panel");
 })


 



 app.listen(3000,()=>{
    console.log('Server is running on port 3000');
 })