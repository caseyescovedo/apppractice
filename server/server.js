// Modify your code to enforce the following authentication measures. (Use the `server/controllers/authController.js` file to add any middleware functions):
// - [ ] The only successful login credentials should be to have a user of `codesmith` and a pass of `ilovetesting`. 
// Providing these credentials will redirect to the secret page route as before. 
// Any other credentials (or none at all) will send the string `unsuccessful login attempt`
// - [ ] Providing the correct login credentials should set a cookie on the client with a key of `token` and a value of `admin`
// - [ ] Visiting the `http://localhost:3333/secret` route directly should now check for the valid cookie before sending the secret page. If the cookie is not valid (or does not exist), send back the string `You must be signed in to view this page`



//Make sure the `Content-Type` header is getting properly set in the HTTP response. (Some methods from some frameworks infer the content type from the file extension and set the header automatically.)
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3333;
const bodyParser = require('body-parser');
// const cookieParser = require("cookie-parser");

const taskController = require('./controllers/taskController');
// const cookieController = require('./controllers/cookieController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// - [x] When you visit `http://localhost:3333/` in the browser, it should serve the `index.html` file from the `views` folder. 
//This is the login page for the application.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
});

// - [x] When you visit `http://localhost:3333/secret` in the browser, you should render the `secret.html` file from the `views` folder.
// This is the To-Do application
app.get('/secret', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'))
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// - [x] You should also serve the CSS and JS that the html files are requesting. These are located in the `assets` folder. 
app.use('/', express.static(path.join(__dirname, '../assets')));

app.get('/getTasks', taskController.getTasks, (req, res) => {
    res.send(res.locals.tasks)
})

app.post('/postTask', taskController.postTask,
    (req, res) => {
        // console.log("RES LOCALS IN SERVERRR.JS: ", res.locals)
        res.status(200).json(res.locals);
    })

app.delete('/delete/:id', taskController.deleteTask, (req, res, next) => {
    console.log("REQ.PARAMS: ", req.params);
})
//login ran out of time
// app.post(
//     "/login",
//     cookieController.setSSIDCookie,
//     authController.verifyUser,
//     authController.startSession,
//     (req, res) => {
//         if (res.locals.result) res.redirect("/secret");
//         else console.log('You must be signed in to view this page')
//     }
// );
//global error handler
app.use('*', (req, res) => res.sendStatus(404));

// - [x] Create a Node.js HTTP server that listens on port 3333. (You may use Express if you'd like, but it is not necessary.)
app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
})