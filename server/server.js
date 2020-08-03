const express = require("express");
const app = express();
const pg = require("pg");
const router = express.Router();
const cors = require("cors");
const path = require("path");
const env = require('dotenv').config();

const models = require("./models/TaskModel");

app.use(cors());

app.use(express.static(path.join(__dirname, "../views")))
app.use(express.static(path.join(__dirname, "../assets")))

app.use("/secret", express.static(path.join(__dirname, "../assets")))

app.get("/", 
  (req, res, next) => {
    console.log(" heard ")
  }
)

app.use("/db", 
  models, 
  (req, res) => {
    console.log(" Done with Route Model Middleware ");     
  }
)


app.get("/secret", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../views/secret.html") );  
})

app.use( (req, res, next, err) => {
  if(err){
    console.log(" ERROR: ", err);
  }
})

app.listen(3333, console.log(" LISTENING ON 3333"));