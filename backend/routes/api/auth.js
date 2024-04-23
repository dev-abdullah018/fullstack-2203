const express = require("express");
const route = express.Router()
const registrationController = require("../../controllers/registrationController")
const otpController = require("../../controllers/otpController")
// const secureApi = require("../../middleware/secureApi");
const loginController = require("../../controllers/loginController");
const linkController = require("../../controllers/linkController");
const resendEmailController = require("../../controllers/resendEamilController");
const forgotpassController = require("../../controllers/forgotPassController");
const newPassController = require("../../controllers/newPassController");


// route.post("/registration", secureApi, registrationController);
route.post("/registration", registrationController);
route.post("/login", loginController);
route.post("/otpVerification", otpController);
route.post("/linkverification", linkController);
route.post("/resendemail", resendEmailController);
route.post("/forgotpass", forgotpassController);
route.post("/newpass", newPassController);

module.exports = route