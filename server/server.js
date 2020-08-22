//require the express
const express = require("express");
const app = express();
const path = require("path");
const apiRouter = require("./controllers/api.js");
const cookieParser = require("cookie-parser");

const api = require("./controllers/api.js");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);
//serve the style.css and the js that the hmtl files are requesting
app.use("/css", express.static(path.join(__dirname, "../assets/css")));
app.use("/js", express.static(path.join(__dirname, "../assets/js")));

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "../views/index.html")); // we specify which file to serve
});

//
app.get("/secret", (req, res) => {
  return res.sendFile(path.join(__dirname, "../views/secret.html")); // we specify which file to serve
});

app.use("/api", api);

app.use((req, res) => res.sendStatus(404)); // 404 NOT FOUND

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//listen on port 3333

app.listen(3333);

module.exports = app;
