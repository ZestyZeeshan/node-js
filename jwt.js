const jwt = require('jsonwebtoken') ;

//now w make middleware which is token based
const jwtMiddleware = (req,res,next)=>{


   // first check request headers has authorization or not
   const authorization = req.headers.authorization
   if(!authorization) return res.status(401).json({error : "Token Not Found"});

    //extract the jwt token from the request header
    const token = req.headers.authorization.split('')[1];
    if(! token){
      return res.status(401).json({error:'Unauthorized'});
    }

    try{
        //Verify the JWT 
       const decoded =  jwt.verify(token, process.env.JWT_SECRET);

       //atttcha user info request object
       req.user = decoded;
       next();
    }catch(err){
       console.error(err);
       res.status(401).json({error: 'Invalid token'})
    }

}

//Function to generate JWT token
const generateToken = (userData) => {
  //Generate a new JWT token using user data
  return jwt.sign(userData, process.env.JWT_SECRET)
}


module.exports = {jwtMiddleware, generateToken};