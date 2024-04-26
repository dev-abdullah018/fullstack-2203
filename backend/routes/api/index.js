const express = require("express");
const route = express.Router();
const auth = require("./auth");
const productRoutes = require("./productroutes");

route.use("/auth", auth);
route.use("/product", productRoutes);

module.exports = route;
