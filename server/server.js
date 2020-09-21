const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const taskController = require("./controllers/taskController");
const router = require("./routes/routers");
const PORT = 3333;

// handling incoming data to usable
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serving the html files.
app.use(express.static(path.resolve(__dirname, "../views/")));
// serving the css and js files.
app.use(express.static(path.resolve(__dirname, "../assets/")));

// app.use("/secret", router);
app.post("/secret", taskController.postTask, (req, res) => {
  res.send(200, "This is a post!");
});

app.get("/secret", taskController.getTasks, (req, res) => {
  console.log(res.locals.allTasks);
  res.status(200).send(res.locals.allTasks);
});
// local error handler
app.use((req, res) => res.sendStatus(404));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: " An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
