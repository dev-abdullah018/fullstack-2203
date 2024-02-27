require('dotenv').config()
const express = require("express");
const app = express();
const router = require("./routes")
const mongoConfig = require("./config/mongoConfig")

mongoConfig()

app.use("/", router);
const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log("Port Running")
});
