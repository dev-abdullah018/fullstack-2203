const bcrypt = require('bcrypt');
const User = require("../model/userModel")

let loginController = async(req,res) =>{
    const {email, password} = req.body
    let findUser = await User.findOne({email:email})
    
    console.log(findUser.password);

    if(findUser){
        bcrypt.compare(password, findUser.password, function(err, result) {
            if(result){
                res.send({success:"Login Successful"})
            }else{
                res.send({error: "Credencial not mathched"})
            }
        });
    }else{
        res.send({error: "User Not Found"})
    }

}

module.exports = loginController