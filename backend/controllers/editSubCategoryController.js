const SubCategory = require("../model/subCategoryModel");

const editSubCategoryController = async (req, res) => {
  const { name , oldname } = req.body;

  let existingCategory = await SubCategory.find({ name: name});
  console.log(existingCategory);
  
  if (existingCategory.length > 0) {
    res.send({ error: "Category already exists" });
  } else {
    let subcategory = await SubCategory.findOneAndUpdate(
      { name: oldname},
      {
        name: name
      },
      { new: true }
    );
   
    res.send({ success: "SubCategory Updated " });
  }
};

module.exports = editSubCategoryController;