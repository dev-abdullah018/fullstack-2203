const User = require("../model/userModel");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

const resendEmailController = async (req, res) => {
    try {
      const { email } = req.body;
  
      const existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        return res.status(400).json({ error: "Email not found" });
      }
  
      if (existingUser.emailVerified) {
        return res.status(400).json({ error: "Email already verified" });
      }
  
      const token = jwt.sign({ email: email }, "shhhhh");
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "aahad021182015@gmail.com",
          pass: "rpxu iaxq adua kctn",
        },
      });
  
      await transporter.sendMail({
        from: `'MERNIAN'`,
        to: email,
        subject: "Email Verification",
        html: `<a href="http://localhost:5173/emailverification/${token}" style="display: inline-block; background-color: #1890ff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
        Click here to verify your email
            </a>`
      });
  
      res.status(200).json({
        message: "Email verification link resent successfully."
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  module.exports = resendEmailController;
  