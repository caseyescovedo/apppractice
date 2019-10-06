const express = require("express");
const app = express();
const path = require("path");
const model = require("./models/TaskModel.js");
const taskController = require("./controllers/taskController.js");
const bodyParser = require("body-parser");
const authController = require("./controllers/authController.js");
const cookieParser = require("cookie-parser");
model.CreateTable();
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
	res.set({ "content-type": "text/html" });
	res.status(200).sendFile(path.join(__dirname, "../views/index.html"));
});

app.get("/secret", authController.checkForCookie, (req, res) => {
	res.set({ "content-type": "text/html" });
	res.status(200).sendFile(path.join(__dirname, "../views/secret.html"));
});
app.get("/css/style.css", (req, res) =>
	res.status(200).sendFile(path.join(__dirname, "../assets/css/style.css"))
);
app.get("/js/index.js", (req, res) => {
	res.status(200).sendFile(path.join(__dirname, "../assets/js/index.js"));
});
app.get("/getTasks", taskController.getTasks, (req, res) => {
	res.status(200).send(res.locals.items);
});
//taskController.postTask,
app.post("/postTask", taskController.postTask, (req, res) => {
	res.status(200).json(res.locals.task);
});
app.delete("/removeTask", taskController.postTask, (req, res) => {
	res.status(200).json(res.locals.deleted);
});
app.use("/signin", bodyParser.urlencoded());
app.post(
	"/signin",
	authController.verifyUser,
	authController.addCookieController,
	(req, res) => {
		res.redirect("/secret");
	}
);
app.listen(3333);
