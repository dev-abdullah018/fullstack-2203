const SubCategory = require("../model/subCategoryModel");

const deleteSubCategoryController = async (req, res) => {
   console.log(req.params);

   await SubCategory.findByIdAndDelete(req.params.id)

   res.send("Deleted")
};

module.exports = deleteSubCategoryController;