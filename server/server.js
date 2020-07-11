// packages
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// Files
const taskController = require("../server/controllers/taskController");

const app = express();
// const router = express.Router();

/**
 * Middleware for all requests
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

/**
 * Handle Static Files
 */
app.use(express.static("assets"));
// app.use("/", router);

/**
 * Serve Pages
 */
app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname + "/../views/index.html"));
});

app.get("/secret", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname + "/../views/secret.html"));
});

/**
 * CRUD Routes
 */

app.post("/postTask", taskController.postTask, (req, res) => {
  console.log("end of postTask");
  console.log("res.locals._id", res.locals.id);
  res.status(200).json(res.locals.id);
});

app.get("/getTasks", taskController.getTasks, (req, res) => {
  console.log("end of getTasks");
  // res.status(200).send("Tasks");
});

app.delete("/deleteTask", taskController.deleteTask, (req, res) => {
  console.log("end of deleteTask");
  res.status(200).send("Deleted Task");
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: "Server error occurred"
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  console.log("error:", err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3333, () => {
  console.log("Listening to server at port: 3333");
});
