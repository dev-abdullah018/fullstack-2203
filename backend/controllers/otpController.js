const User = require("../model/userModel")

let otpController = async(req,res) =>{
    const {email,otp} = req.body
    let findUser = await User.findOne({email:email})

    console.log(findUser.otp);

    if(findUser.emailVerification && findUser.otp == otp){
        await User.findOneAndUpdate({email:email}, {otp: ""})
        res.send("milse")
    }else{
        res.send("mile nai");
    }
}

module.exports = otpController