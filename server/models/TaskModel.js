const express = require("express");
const router = express.Router();
const pg = require("pg");
const task = require("../controllers/taskController.js");
// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI;
/* console.log("URI", URI)
const client = new pg.Client(URI); */
//console.log("client", client)

router.get("/add", 
  (req, res, next) => {
    console.log(" WITHIN THE ADD ROUTER");
    next();
  },
  task.postTask, //posts data
  (req, res) => {
    console.log(" Passed through add ");
    res.status(200)
  }
)

router.get("/delete",
  (req, res, next) => {
    console.log(" Made it to delete middleware in model");
    next()
  },
  task.deleteTasks,
  (req, res) => {
    res.status(200)
  }  
)

router.get("/gets",
  (req, res, next) => {
    console.log(" Made it to getall middleware in model");
    next()
  },
  task.getTasks,
  (req, res) => {
    console.log("WE SHOULD NOT BE HERE") //we should never make it here 
    res.status(200);
  }  
)

module.exports = router; // <-- export your model
