const User = require("../model/userModel")
const jwt = require('jsonwebtoken');

let linkController = async(req,res) =>{
    const {token} = req.body
    console.log(token);
    var decoded = jwt.verify(token, 'shhhhh');

    console.log(decoded.email);

    let findUser = await User.findOne({email:decoded.email})


    if(!findUser.emailVerified){
        await User.findOneAndUpdate({email:decoded.email}, {emailVerified: true})
        res.send("Milse")
    }else{
        res.send("Mile nai");
    }
}

module.exports = linkController 