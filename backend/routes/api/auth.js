const express = require("express");
const route = express.Router()
const registrationController = require("../../controllers/registrationController")
const otpController = require("../../controllers/otpController")
const secureApi = require("../../middleware/secureApi");
const loginController = require("../../controllers/loginController");


// route.post("/registration", secureApi, registrationController);
route.post("/registration", registrationController);
route.post("/login", loginController);
route.post("/otpVerification", otpController);

module.exports = route