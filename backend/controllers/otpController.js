// const User = require("../model/userModel")

// let otpController = async(req,res) =>{
//     const {email,otp} = req.body
//     let findUser = await User.findOne({email:email})

//     console.log(findUser.otp);

//     if(!findUser.emailVerified && findUser.otp == otp){
//         await User.findOneAndUpdate({email:email}, {otp: "", emailVerified: true})
//         res.send("Milse")
//     }else{
//         res.send("Mile nai");
//     }
// }

// module.exports = otpController


const User = require("../model/userModel");

const otpController = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      return res.status(404).send("User not found");
    }

    if (!findUser.emailVerified && findUser.otp === otp) {
      await User.findOneAndUpdate({ email: email }, { otp: "", emailVerified: true });
      return res.send("OTP matched");
    } else {
      return res.status(400).send("OTP incorrect or email already verified");
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = otpController;
