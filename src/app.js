 const  express = require('express');
 const app =express();


// multtiple routr handler
 app.use("/user",(req,res,next)=>{
   console.log('User route is called');
   next();

 },(req,res,next)=>{
   res.send('User route is called from responese ');
   next();
 },(req,res,next)=>{
   console.log('User route is called');
   next();
 },(req,res,next)=>{
   console.log('User route is called');
   next();
 } ) 



 app.listen(3000,()=>{
    console.log('Server is running on port 3000');
 })