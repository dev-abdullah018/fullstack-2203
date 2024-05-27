const Product = require("../model/productModel")

const productController = async (req, res) => {
  const { name,description } = req.body;


  console.log(req);

    let product = new Product({
        name: name,
        description: description,
        image: `/uploads/${req.file.filename}`,
    })
   product.save()
    res.send({success: "Product Created"})
  
};

module.exports = productController;
