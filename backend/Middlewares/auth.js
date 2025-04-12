const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer', '').trim();
        const decryptedToken = jwt.verify(token,process.env.JWT_SECRET);
        console.log("decryptedToken:",decryptedToken);
        if(decryptedToken && decryptedToken.userId){
            req.userId = decryptedToken.userId;
            req.role = decryptedToken.role;
            console.log("role:",req.role);
            next();

        }else{
            res.status(403).json({
                success: false,
                statusCode : 403,
                message : "Invalid Token"
            });
        }
    }catch(err){
        console.log("error in Middelware");
        res.status(401).json({
            success:false,
            statusCode : 401,
            message : "Not Authorized"
        });
    }
}
exports.checkRole = (allowedRoles) => {
    return (req, res, next) => {
        console.log("User Role:", req.role); 
      if (!Array.isArray(allowedRoles)) {
        allowedRoles = [allowedRoles]; 
      }
  
      if (!allowedRoles.includes(req.role)) {
        return res.status(403).json({
          success: false,
          statusCode: 403,
          message: `Access restricted to: ${allowedRoles.join(' / ')}`,
        });
      }
  
      next();
    };
  };
/*exports.checkRole = (role) => {
    return (req, res, next) => {
      if (req.role !== role) {
        return res.status(403).json({ message: `Access restricted to ${role}s` });
      }
      next();
    };
  };*/
  