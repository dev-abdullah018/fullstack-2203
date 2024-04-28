const express = require("express");
const route = express.Router()
const addCategoryController = require("../../controllers/addCategoryController");
const addSubCategoryController = require("../../controllers/addSubCategoryController");
const viewSubCategoryController = require("../../controllers/viewSubCategoryController");
const viewCategoryController = require("../../controllers/viewCategoryController");


route.post("/createcategory", addCategoryController);
route.post("/createsubcategory", addSubCategoryController);


route.get("/allcat", viewCategoryController);
route.get("/allsubcat", viewSubCategoryController);


module.exports = route