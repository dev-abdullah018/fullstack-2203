const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const registrationController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.send({ error: "Please fill the all field" });
  }

  if (password && password.length < 6) {
    return res.send({ error: "Password is too small" });
  }

  let existingUser = await User.find({ email: email });

  console.log(existingUser);

  if (existingUser.length > 0) {
    return res.send({ error: `${email} alrady in use ` });
  } else {
    let otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });


    bcrypt.hash(password, 10, async function(err, hash) {
        let user = new User({
            name: name,
            email: email,
            password: hash,
            otp: otp
        })

        user.save();

        const transporter = nodemailer.createTransport({
           service: "gmail",
            secure: false,
            auth: {
              user: "aahad021182015@gmail.com",
              pass: "rpxu iaxq adua kctn",
            },
          });

          const info = await transporter.sendMail({
            from: `'MERNIAN'`, // sender address
            to: email, // list of receivers
            subject: "This is Your Verification", // Subject line
            html:`Here is your <b>OTP:</b> ${otp}`, // html body
          });

        res.send({
            name: user.name,
            email: user.email,
            role: user.role
        })
    });
  }

  // console.log(name,email,password)

  // res.send(data);
};

module.exports = registrationController;
