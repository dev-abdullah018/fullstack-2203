const SubCategory = require("../model/subCategoryModel");

const addSubCategoryController = async (req, res) => {
  const { name,categoryId } = req.body;
  
  console.log(name.toLowerCase());

  let existingCategory = await SubCategory.find({ name: name.toLowerCase() });
 console.log(existingCategory);
  if(existingCategory.length > 0){
    res.send({error:"SubCategory already exists"})
  }else{
    let cat = new SubCategory({
        name: name.toLowerCase(),
        categoryId: categoryId,
    })
    cat.save()
    res.send({success: "SubCategory Created"})
  } 
};

module.exports = addSubCategoryController;
