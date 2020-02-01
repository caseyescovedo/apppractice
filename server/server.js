const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const taskController = require("./controllers/taskController.js");
const authController = require("./controllers/authController.js");

const PORT = 3333;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "../assets")));
app.get("/secret", (req, res) => {
  if (req.cookies && req.cookies.token === "admin") {
    return res
      .status(200)
      .sendFile(path.resolve(__dirname, "../views/secret.html"));
  } else {
    return res.send("You must be signed in to view this page");
  }
});
app.get("/", (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, "../views/index.html"));
});
app.get("/task", taskController.getTasks, (req, res) => {
  res.json(res.locals.items);
});
app.post("/task", taskController.postTask, (req, res) => {
  res.json("Req heard");
});
app.delete("/task", taskController.deleteTasks, (req, res) => {
  res.json("Req heard");
});
app.post("/signin", authController.signIn, (req, res) => {
  res.json({ message: res.locals.message });
});
app.use("*", (req, res) => {
  res.status(404).send("This page is missing. Its probably my fault.");
});
app.use((err, req, res, next) => {
  console.log(
    "Error in the the middleware has occurred. Its probably my fault."
  );
  return res.json(err);
});
app.listen(3333, () => {
  console.log(`Listening on Port ${PORT}`);
});
