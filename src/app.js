 const  express = require('express');
 const {adminAuth,userAuth} = require("./middleware/auth");
 const app =express();

 app.use("/admin",adminAuth);
 app.get("/admin/getAll",(req,res)=>{
 throw new Error("This is a test error");
  
   

//     try{
      
// //  res.send("Welcome to the admin panel");
//     }catch(err){
//         res.status(500).send("Internal Server Error");
//     }
 })

 
//  wildcard routr for error handling
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });


 



 app.listen(3000,()=>{
    console.log('Server is running on port 3000');
 })