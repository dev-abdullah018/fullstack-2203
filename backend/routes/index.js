const express = require("express");
const route = express.Router()
const apiRouter = require('./api')


route.use(process.env.API_URL, apiRouter);

module.exports = route