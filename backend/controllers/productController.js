const Product = require("../model/productModel")

const productController = async (req, res) => {
  const { name } = req.body;


  console.log(req);

    let product = new Product({
        name: name,
        image: `/uploads/${req.file.filename}`,
    })
   product.save()
    res.send({success: "Product Created"})
  
};

module.exports = productController;
