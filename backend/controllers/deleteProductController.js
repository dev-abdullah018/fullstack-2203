const Product = require("../model/productModel");

const deleteProductController = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Error deleting product' });
  }
};

module.exports = deleteProductController;
