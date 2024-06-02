const SubCategory = require("../model/subCategoryModel");

const approveSubCategoryController = async (req, res) => {
  const { id, status } = req.body;
  
  let updateSubCat = await SubCategory.findOneAndUpdate(
    { _id: id },
    { status: status == "waiting" ? "approve" : "waiting" },
    {new: true}
  );

  res.send("Updated")
};

module.exports = approveSubCategoryController;