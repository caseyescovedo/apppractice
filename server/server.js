const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const authController = require("./controllers/authController");
const secretRouter = require("./routers/secretapi");

const app = express();
const PORT = 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../views/index.html"));
});

app.post(
  "/signin",
  authController.loginUser,
  authController.setCookie,
  (req, res) => res.sendFile(path.resolve(__dirname, "../views/secret.html"))
);

app.use("/secretApi", secretRouter);

app.use("/css/style.css", (req, res) => {
  res.set({
    "Content-Type": "text/css",
    charset: "UTF-8",
  });
  res.status(200).sendFile(path.join(__dirname, "../assets/css/style.css"));
});

app.use("/js/index.js", (req, res) => {
  res.set({
    "Content-Type": "text/javascript",
    charset: "UTF-8",
  });
  res.status(200).sendFile(path.resolve(__dirname, "../assets/js/index.js"));
});

app.get("/secret", authController.verifyUser, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../views/secret.html"));
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
