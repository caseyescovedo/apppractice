const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3333;
const taskController = require("./controllers/taskController");
const authController = require("./controllers/authController");

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded());
app.use(cookieParser());
// setting up default error handler to help with bugs
app.post("/task", taskController.postTask);
app.get("/task", taskController.getTasks);
app.delete("/task/:id", taskController.deleteTasks);
app.post("/signin", authController.login);
// When you visit http://localhost:3333/ in the browser,
//it should serve the index.html file from the views folder.
//This is the login page for the application.

app.get("/style.css", (req, res) => {
  return res
    .contentType("text/css")
    .sendFile(path.resolve("assets/css/style.css"));
});

app.get("/js/index.js", (req, res) => {
  return res
    .contentType("text/javascript")
    .sendFile(path.resolve("assets/js/index.js"));
});

app.get("/", (req, res) => {
  return res.sendFile(path.resolve("./views", "index.html"));
});

app.get(
  "/secret",
  // adding middle where to check if there
  authController.verify,
  /** There should be an auth check step here , */
  (req, res) => {
    return res.sendFile(path.resolve("./views", "secret.html"));
  }
);

app.use((err, req, res, next) => {
  const defaultError = {
    log: err
      ? err.log
      : "Express error handler caught and unknown middleware error",
    status: 400,
    message: {
      errors: [{ msg: err ? err.message.err : "An error has occured" }],
    },
  };
  console.error(defaultError.log);
  res.status(defaultError.status).send(defaultError.message);

  return next();
});

app.listen(port);

console.log(`Listening on ${port} at: http://localhost:${port}`);
