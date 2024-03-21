const  jwt  = require("jsonwebtoken");
const  jwtconfig  =  require("../config/jwt");

const authenticateToken = (req,res,next) =>{
  const token = req.header("Authorization");
  let actualToken = token.split(" ")[1]
  // console.log(token)

  if (!actualToken) {
    

    return res.status(401).json({ message: "Unauthrorized: Token not provided"});
  }
  

  jwt.verify(actualToken,jwtconfig.jwtsecretkey,(err,user) => {
    if(err){
      
        return res.status(403).json({ message: "Forbidden: Invalid token"});
    }
    else{
      console.log(actualToken,"error",user)
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;