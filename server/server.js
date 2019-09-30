const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');

const PORT = 3333;

// handle parsers
app.use(bodyParser.json());
app.use(cookieParser());

// serve static files
app.use('/', express.static(path.resolve(__dirname, '../assets')));

// DEFINE ROUTES:
// slash route should serve login page
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/index.html'));
})

// navigate to secret page
app.get('/secret', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/secret.html'))
});

// get all todos on button click
app.get('/todos', taskController.getTasks);

// add todo
app.post('/todos', taskController.postTask);

// delete todo
app.delete('/todos', taskController.deleteTask);

// 404 error handler
app.use('*', (req, res) => {
    res.status(404).send('NOT FOUND')
})

// global error handler
app.use((err, req, res, next) => {
   res.send(500).send(`MY BAD, ${err}`)
})



app.listen(PORT, () => console.log(`listening on port ${3333}`) )