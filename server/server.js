const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authController = require("./controllers/authController");
const taskController = require("./controllers/taskController");
const PORT = 3333;

//Parse json request object
app.use(bodyParser.json());
app.use(cookieParser());

//Parse nested objects in request body
app.use(bodyParser.urlencoded({ extended: true }));

//server static files
app.use("/assets", express.static(path.join(__dirname, "../assets")));

//serve login page
app.get(
  "/",
  (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../views/index.html"));
  },
  authController.setCookie,
  authController.verifyUser
);

//serve to-do application
app.get("/secret", authController.verifyUser, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/secret.html"));
});

app.get("/items", taskController.getTasks, (req, res) => {
  res.status(200).send(res.locals.item);
});

app.post("/items", taskController.postTask, (req, res) => {
  res.status(200).send(res.locals.item);
});

app.delete("/items", taskController.deleteTask, (req, res) => {
  res.status(200).send(res.locals.success);
});

app.post("/signin", authController.setCookie, (req, res) => {
  res.redirect("/secret");
});

//catch all error handling
app.use("*", (req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
  console.log(`Global error handler caught unknown middleware error: ${err}`);
  res.status(400).json({ err: "An error occured" });
});

app.listen(PORT, () => {
  console.log(`Listening on PORT --> ${PORT}`);
});
