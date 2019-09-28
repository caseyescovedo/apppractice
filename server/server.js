const express = require('express');
const app = express();
const path = require('path');
const PORT = 3333;
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const database = require('./models/TaskModel.js');
const authController = require('./controllers/authController.js')



// add parsers 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// to use assets folder
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// to use index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})
// // to use secret.html file
app.get('/secret', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'))
})

// getTask request from frontend
app.get('/tasks', database.getTasks, (req, res) => {
    console.log(res.locals.getTasks)
    return res.status(200).json(res.locals.getTasks)
});


// postTask request from frontend
app.get('/tasks', database.postTask, (req, res) => {
    console.log(res.locals.postTasks)
    return res.status(200).json(res.locals.postTask)
});

// deleteTask request from frontend
app.get('/tasks/:id', database.deleteTask, (req, res) => {
    console.log(res.locals.deleteItem)
    return res.status(200).json(res.locals.deleteItem)
});


// signin 
app.post('/signin', authController.verifyUser, authController.setCookie, (req, res) => {
    if (res.locals.verifyUser === false) {
        return res.redirect("/");
    } else {
        return res.status(200).redirect("/secret");
    }
})

// authorized routes
app.get("/secret", authController.setCookie, (req, res) => {
    res.locals.sessionId((err, users) => {
        if (err) throw err;
        res.render("../views/secret", { users: users });
    });
});

// 404 error handler 
app.use("*", (req, res) => {
    res.status(404).send("NOT FOUND");
})

// global error handler
app.use((err, req, res, next) => {
    res.status(500).json("an unexpected error occured: ${err}");
})

// to listen the server port
app.listen(PORT, () => {
    console.log(`Server Listening on Port ${PORT} ^0^`)
})