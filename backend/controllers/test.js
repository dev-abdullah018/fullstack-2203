

// //////////////registrationController ////////////////////
////////////////////////////main
// const User = require("../model/userModel");
// const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
// const otpGenerator = require("otp-generator");
// const jwt = require('jsonwebtoken');

// const registrationController = async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.send({ error: "Please fill the all field" });
//   }

//   if (password && password.length < 6) {
//     return res.send({ error: "Password is too small" });
//   }

//   let existingUser = await User.find({ email: email });

//   console.log(existingUser);

//   if (existingUser.length > 0) {
//     return res.send({ error: `${email} alrady in use ` });
//   } else {
//     let otp = otpGenerator.generate(6, {
//       lowerCaseAlphabets: false,
//       upperCaseAlphabets: false,
//       specialChars: false,
//     });


//     bcrypt.hash(password, 10, async function(err, hash) {
//         let user = new User({
//             name: name,
//             email: email,
//             password: hash,
//             otp: otp
//         })

//         user.save();
//         jwt.sign({ email: email }, "shhhhh", async function(err, token) {
//           const transporter = nodemailer.createTransport({
//             service: "gmail",
//              secure: false,
//              auth: {
//                user: "aahad021182015@gmail.com",
//                pass: "rpxu iaxq adua kctn",
//              },
//            });
 
//            const info = await transporter.sendMail({
//              from: `'MERNIAN'`, // sender address
//              to: email, // list of receivers
//              subject: "This is Your Verification", // Subject line
//             // html:`Here is your <b>OTP:</b> ${otp}`, // html body
//             html:`<a href="http://localhost:5173/emailverification/${token}">Click here</a>`
//            });
//         })

//         // setTimeout(async()=>{
//         //   await User.findOneAndUpdate({email:email}, {otp:''})
//         //   console.log("done");
//         // },10000)
//         res.send({
//             name: user.name,
//             email: user.email,
//             role: user.role
//         })
//     });
//   }

//   // console.log(name,email,password)

//   // res.send(data);
// };

// module.exports = registrationController;

/////////////////////////////////////////////////////////////////note
// const User = require("../model/userModel");
// const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
// const otpGenerator = require("otp-generator");
// const jwt = require('jsonwebtoken');

// const registrationController = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "Please fill all fields" });
//     }

//     if (name.length < 3) {
//       return res.status(400).json({ error: "Name is too small" });
//     }

//     if (password.length < 6) {
//       return res.status(400).json({ error: "Password is too small" });
//     }

//      // Validate email format
//      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//      if (!emailRegex.test(email)) {
//        return res.status(400).json({ error: "Invalid email format" });
//      }

//     let existingUser = await User.findOne({ email: email });

//     if (existingUser) {
//       return res.status(400).json({ error: "Email is already in use" });
//     }

//     let otp = otpGenerator.generate(6);

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({
//       name: name,
//       email: email,
//       password: hashedPassword,
//       otp: otp
//     });

//     await user.save();

//     const token = jwt.sign({ email: email }, "shhhhh");

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "aahad021182015@gmail.com",
//         pass: "rpxu iaxq adua kctn",
//       },
//     });

//     await transporter.sendMail({
//       from: `'MERNIAN'`,
//       to: email,
//       subject: "Email Verification",
//       html: `<a href="http://localhost:5173/emailverification/${token}">Click here to verify your email</a>`
//     });

//     res.status(201).json({
//       message: "Registration successful. Please check your email for verification."
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// module.exports = registrationController;





// //////////////resendEmailController ////////////////////

const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const jwt = require('jsonwebtoken');

const resendEmailController = async (req, res) => {
      const { email } = req.body;
  
      const existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        return res.status(400).json({ error: "Email not found" });
      }

      // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  
      if (existingUser.emailVerified) {
        return res.status(400).json({ error: "Email already verified" });
      }else {
        let otp = otpGenerator.generate(6, {
          lowerCaseAlphabets: false,
          upperCaseAlphabets: false,
          specialChars: false,
        });
     }

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
            html: `<a href="http://localhost:5173/emailverification/${token}">Click here</a>`
          });
        });
  
        res.status(201).json({
          message: "Registration successful. Please check your email for verification."
        });
      });
  };
  
  module.exports = resendEmailController;
  