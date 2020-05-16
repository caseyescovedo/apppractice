const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./models/TaskModel");
const authController = require("./controllers/authController");
const taskController = require("./controllers/taskController");
const path = require("path");
const cookieParser = require("cookie-parser");

app.use(bodyparser());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

app.get("/api", taskController.getTodo);
app.post("/api", taskController.addItem);
app.delete("/api", taskController.deleteItem);

app.post("/signin", authController.verifyUser);

app.get("/secret", (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (token === "admin") {
      res.sendFile(path.join(__dirname, "../views/secret.html"));
    } else {
      res.json("You must be signed in to view this page");
    }
  } catch (err) {
    next({ log: "secret error" });
  }
});
app.use(express.static(path.join(__dirname, "../assets")));

app.use("/", (req, res) => {
  res.status(404).send("youre in the wilderness now i cant guide ya");
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "idk man express caught middleware error somewhere",
    status: 400,
    message: { err: "an error boss, my middleware needs tewaking" },
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(3333, () => console.log("listening on numba 3333 boss"));
