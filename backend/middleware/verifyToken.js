var jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const token = req.headers.token;

    if(!token){
        res.send("Token Required")
    }else{
        // var decoded = jwt.verify(token, 'shhhhh'); 

        jwt.verify(token, 'shhhhh', function(err, decoded) {
            console.log(decoded);
            if(decoded){
                next()
            }else{
                res.send("Valid token required")
            }
          });
          
        // console.log(decoded.email);
    }


}

module.exports = verifyToken;