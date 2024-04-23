const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

const forgotpassController = async (req, res) => {
  const { email } = req.body;

  let existingUser = await User.find({ email: email });
   
  console.log(existingUser);

  if(existingUser.length > 0){
    console.log(existingUser);

     jwt.sign({ email: email }, "shhhhh", async function (err, token) {
        if (err) {
          return res.status(500).json({ error: "Internal server error" });
        }

        const transporter = nodemailer.createTransport({
          service: "gmail",
          secure: false,
          auth: {
            user: "aahad021182015@gmail.com",
            pass: "rpxu iaxq adua kctn",
          },
        });

        await transporter.sendMail({
          from: `'MERNIAN'`, // sender address
          to: email, // list of receivers
          subject: "This is Your Verification", // Subject line
          html: `<a href="http://localhost:5173/newpass/${token}">Click here</a>`
        });
      });
      
  }else{
    res.send({error: "User not found"})
  }
  
};

module.exports = forgotpassController;
