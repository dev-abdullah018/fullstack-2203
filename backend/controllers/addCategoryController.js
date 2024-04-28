const Category = require("../model/categoryModel");

const addCategoryController = async (req, res) => {
  const { name } = req.body;
  
  console.log(name.toLowerCase());

  let existingCategory = await Category.find({ name: name.toLowerCase()});
 console.log(existingCategory);
  if(existingCategory.length > 0){
    res.send({error:"Category already exists"})
  }else{
    let cat = new Category({
        name: name.toLowerCase()
    })
    cat.save()
    res.send({success: "Category Created"})
  } 
};

module.exports = addCategoryController;
