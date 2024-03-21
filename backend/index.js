require('dotenv').config()
const express = require("express");
var cors = require('cors')
const app = express();
const router = require("./routes")
const mongoConfig = require("./config/mongoConfig")

mongoConfig()
app.use(cors())
app.use(express.json())
app.use("/", router);

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log("Port Running")
});
