const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

// require middlewares 
const taskController = require("./controllers/taskController")

// connect to DB 
mongoose.connect('mongodb://bradley:luna801@ds229771.mlab.com:29771/greatlist', () =>{
    console.log("connected to MongoDB")
})

const app = express();
const PORT = 3333;

// app setup 
app.use(bodyParser.json());
// serve static assets
app.use("/assets", express.static(path.join(__dirname,'../assets/')));



app.get("/style.css", (req, res) => {
    res.set({'content-type': 'text/html; UTF-8'})
        .sendFile(path.join(__dirname, '../assets/css/style.css'))
})
// serve the index from the views folder
app.get("/", (req, res) => {
    res.set({'content-type': 'text/html; UTF-8'})
    .sendFile(path.join(__dirname,'../views/index.html'))
});
// render the secret file
app.get("/secret", (req, res) => {
    res.set({'content-type': 'text/html; UTF-8'})
    .sendFile(path.join(__dirname,"../views/secret.html"))
});

app.get("/tasks", taskController.getTasks, (req, res) =>{
    res.status(200).json(res.locals.data)
});

app.post("/tasks", taskController.postTask, (req, res) =>{
    res.status(200).json()
});

app.delete("tasks/:id", taskController.deleteTask, (req, res) => {
    res.status(200)
})



app.use('*', (req, res) => {
    res.status(404).send('Page Not Found');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Something went wrong');
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})