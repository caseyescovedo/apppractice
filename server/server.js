const express = require("express");
const path = require("path");
const port = 3333;
const app = express();
const taskController = require("./controllers/taskController");
const authController = require("./controllers/authController");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Static assets
app.use("/", express.static(path.join(__dirname, "../assets/")));

//Main Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

//Auth login
app.post(
  "/signin",
  authController.verifyUser,
  authController.setCookie,
  (req, res) => {
    res.redirect("/secret");
  }
);

//Served after login
app.get("/secret", authController.verifyCookie, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/secret.html"));
});

//Routes
app.get("/getTasks", taskController.getTasks, (req, res, next) => {
  res.status(200).json([...res.locals.tasks]);
});

app.post("/postTask", taskController.postTask, (req, res, next) => {
  res.status(200).json([res.locals.tasks]);
});

app.delete("/deleteTask/:id", taskController.deleteTask, (req, res, next) => {
  res.status(200).json("task was deleted");
});

//Global Handling
app.use("*", (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

app.listen(port, () => console.log(`App listening on port ${port}`));
