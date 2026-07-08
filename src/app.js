 const  express = require('express');
 const app =express();



 /**
 * @description Handle GET request to /user
 */
 // handle GET request to /user
 app.get(("/user"),(req,res)=>{
   res.send({statusCode: 200, name: "John", age: 30})
 })

 /**
 * @description Handle POST request to /user
 */
 //handle post request to /user
 app.post(("/user"),(req,res)=>{
   res.send({statusCode: 201, message: "User created successfully", data: req.body})
   console.log(req);
 })

 /**
 * @description Handle DELETE request to /user
 */
 //handle delete request to /user
 app.delete(("/user"),(req,res)=>{
   res.send({statusCode: 200, message: "User deleted successfully"})
 })

 //handle all requests to /abc
 app.use(("/abc"),(req,res)=>{
    console.log('Hello from middleware',req.url);

    res.send('Hello World')

 })

 app.listen(3000,()=>{
    console.log('Server is running on port 3000');
 })