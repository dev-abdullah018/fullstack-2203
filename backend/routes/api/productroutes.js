const express = require("express");
const route = express.Router()
const addCategoryController = require("../../controllers/addCategoryController")


route.post("/createcategory", addCategoryController);


module.exports = route