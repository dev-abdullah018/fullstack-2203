const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const jwt = require('jsonwebtoken');

const registrationController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  if (name.length < 3) {
    return res.status(400).json({ error: "Name is too small" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password is too small" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  let existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(400).json({ error: "Email is already in use" });
  } else {
    let otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }

      let user = new User({
        name: name,
        email: email,
        password: hash,
        otp: otp
      });

      await user.save();

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
          html: `<a href="http://localhost:5173/emailverification/${token}" style="display: inline-block; background-color: #1890ff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Click here</a>`
        });
      });

      res.status(201).json({
        message: "Registration successful. Please check your email for verification."
      });
    });
  }
};

module.exports = registrationController;
