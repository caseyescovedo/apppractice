// packages
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Files
const taskController = require("../server/controllers/taskController");
const authController = require("../server/controllers/authController");

const app = express();

/**
 * Middleware for all requests
 */
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

/**
 * Handle Static Files
 */
app.use(express.static("assets"));

/**
 * Serve Pages
 */
app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname + "/../views/index.html"));
});

app.get("/secret", (req, res) => {
  if (req.cookies.token === "admin") {
    res.status(200).sendFile(path.resolve(__dirname + "/../views/secret.html"));
  } else {
    res.send("You must be signed in to view this page");
  }
});

/**
 * Sign In
 */
app.post("/signin", authController.verifyUser);

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
  res.status(200).json("Deleted Task");
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
