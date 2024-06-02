const Category = require("../model/categoryModel");

const deleteCategoryController = async (req, res) => {
   console.log(req.params);

   await Category.findByIdAndDelete(req.params.id)

   res.send("Deleted")
};

module.exports = deleteCategoryController;