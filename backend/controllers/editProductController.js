const Product = require("../model/productModel");

const editProductController = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updateData = { name, description };

    // Check if a new image file is uploaded
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.send(updatedProduct);
  } catch (error) {
    res.status(500).send({ error: 'Error updating product' });
  }
};

module.exports = editProductController;
