const mongoose = require("mongoose");

let mongoConfig = () => {
  mongoose
    .connect(
      "mongodb+srv://mernian:dAIEUaMQmT6oA2OH@cluster0.rm1qtu3.mongodb.net/mernianecommerce?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Database Connected!"));
};

module.exports = mongoConfig;
