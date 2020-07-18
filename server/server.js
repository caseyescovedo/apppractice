//import required tools
const express = require("express");
const path = require("path");

//create an instance of express server
const app = express();

//import controllers
const taskController = require("./controllers/taskController");
const authController = require("./controllers/authController");

//declare the listening port
const PORT = 3333;

//intiate express parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serve static files
app.use("/", express.static(path.join(__dirname, "../assets/")));

//connect index html
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../views/index.html"));
});

//connect secret html
app.get("/secret", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../views/secret.html"));
});

//router for get requests
app.get("/secret/tasks", taskController.getTasks, (req, res) => {
  return res.status(200).json(res.locals.data);
});

//router for delete requests
app.delete("/secret/tasks/:id", taskController.deleteTask, (req, res) => {
  return res.status(200).json(res.locals.data);
});

//router for add requests
app.post("/secret/tasks", taskController.addTask, (req, res) => {
  return res.status(200).json(res.locals.data);
});

//generic error handler
app.use("*", (req, res) => {
  return res.sendStatus(404);
});

//global error handler
app.use((err, req, res, next) => {
  //create a default error object
  const defaultErr = {
    message: "Server side error, please try again.",
    log: "500 Error",
    status: 500,
  };
  //utilize object assign to make changes to default error properties based on err
  const errObj = Object.assign(defaultErr, err);
  //message for server side
  console.log("Error occurrence: ", errObj.log);
  //message for client side
  res.status(errObj.status).send(errObj.message);
});

//verify server is running
app.listen(PORT, () => {
  console.log(
    `Hey Los Angeles, we are serving up some righteous data on Localhost: ${PORT}`
  );
});

//export the server
module.exports = app;
