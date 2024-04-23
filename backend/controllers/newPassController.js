const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

let newPassController = async(req,res) =>{
    const {password,token} = req.body
    console.log(token);
    var decoded = jwt.verify(token, 'shhhhh');

    console.log(decoded.email);

    bcrypt.hash(password, 10, async function (err, hash) {
      
        await User.findOneAndUpdate({email:decoded.email},{password: hash})
        res.send({success: "password changed"})
      });
    
    
}

module.exports = newPassController 