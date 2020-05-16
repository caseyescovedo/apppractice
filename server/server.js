const path = require('path');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = 3333;


// Importing Task Controller
const taskController = require('./controllers/taskController');

// To serve static files:
app.use(express.static(path.join(__dirname, '../assets')));

// Home Page for login
app.get("/", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../views/index.html"))
);

// Secret Page for To-Do
app.get("/secret", (req, res) => 
    res.sendFile(path.resolve(__dirname, "../views/secret.html"))
)


// Post tasks
// app.post('/secret', taskController.postTask, (req,res) => {
//     res.status(200).json(res.locals.result);
// })



// app.post('/secret', 
//     taskController.postTask, 
//         (req, res) => {
//             res.status(200).json(res.locals.result);
//         }
// );



//Global error handler. PS: You must add next otherwise res.status it's not a function
app.use((err, req, res, next) => {
    console.log('error is ', err);
    res.status(500).send('Internal Server Error');
})


app.listen(port, () => console.log(`server listening on port (should be 3333) => ${port}`));

module.exports = app;