 const adminAuth =((req,res,next)=>{
    console.log("Admin authentication middleware called");
    const authentictedToken ="abc123";
    const isAuthenticated = authentictedToken === "abc123";

    if (!isAuthenticated) {
      res.status(401).send('Unauthorized'); 
    } else {
      next(); 
    }

 })


 const userAuth =((req,res,next)=>{
    console.log("User authentication middleware called");
    const authentictedToken ="xyz789";
    const isAuthenticated = authentictedToken === "xyz789";

    if (!isAuthenticated) {
      res.status(401).send('Unauthorized'); 
    } else {
      next(); 
    }

 })     
 module.exports = {adminAuth,userAuth};