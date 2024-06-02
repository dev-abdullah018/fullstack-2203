const Category = require("../model/categoryModel");

const editCategoryController = async (req, res) => {
  const { name , oldname } = req.body;

  let existingCategory = await Category.find({ name: name});
  console.log(existingCategory);
  
  if (existingCategory.length > 0) {
    res.send({ error: "Category already exists" });
  } else {
    let category = await Category.findOneAndUpdate(
      { name: oldname},
      {
        name: name
      },
      { new: true }
    );
   
    res.send({ success: "Category Updated " });
  }
};

module.exports = editCategoryController;
