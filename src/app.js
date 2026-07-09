 const  express = require('express');
 const app =express();



 /**
 * @description Handle GET request to /user
 */
 // handle GET request to /user
 app.get(("/user/:name/:id/:age"),(req,res)=>{
   res.send({statusCode: 200, name: req.params.name, age: req.params.age, id: req.params.id})
   console.log(req.params)
 })



 app.listen(3000,()=>{
    console.log('Server is running on port 3000');
 })