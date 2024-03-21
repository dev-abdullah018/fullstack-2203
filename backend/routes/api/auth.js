const express = require("express");
const route = express.Router()
const registrationController = require("../../controllers/registrationController")
const otpController = require("../../controllers/otpController")
const secureApi = require("../../middleware/secureApi")


route.post("/registration", secureApi, registrationController);
route.post("/otpVerification", otpController);

module.exports = route