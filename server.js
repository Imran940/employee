const express = require("express");
const cors = require("cors")
const { readdirSync } = require("fs")
//app begin
const app = express();
const port = process.env.PORT || 8000



//middlewares
app.use(cors())
app.use(express.json())

//routes
readdirSync('./routes').map((r) => app.use("/", require('./routes/' + r)))

//
app.listen(port, () => console.log("connection success"))