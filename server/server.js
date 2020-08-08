const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const tasksController = require("./controllers/taskController");
const authController = require("./controllers/authController");
const app = express();
const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static("views"));
app.use(express.static("assets"));

app.post(
  "/signin",
  authController.checkCreds,
  authController.setCookie,
  (req, res) => {
    return res.status(200).redirect("/secret");
  }
);

// /signin?
// app.post('/', authController.checkCreds, authController.setCookie, (req, res) => {
//   return res.status(200).redirect('/secret');
// });
app.get("/", authController.checkCookie, (req, res) => {
  return res.status(200).redirect("/secret");
});

app.get("/secret", authController.checkCookie, (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../views/secret.html"));
});

app.get(
  "/secret/all",
  authController.checkCookie,
  tasksController.getTasks,
  (req, res) => {
    return res.status(200).json(res.locals.tasks);
  }
);

app.post("/", tasksController.postTask, (req, res) => {
  return res.status(200).json(res.locals.data);
});

app.delete("/:id", tasksController.deleteTask, (req, res) => {
  return res.status(200).json(res.locals.task);
});

// app.get('/', (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
// });

// app.get('/secret', (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
// });

// app.use(express.static("views"));
// app.use(express.static("assets"));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

module.exports = app;
