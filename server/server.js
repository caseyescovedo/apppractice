const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const taskRouter = require('./controllers/taskController');

const app = express();
const PORT = 3333;

app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.get('/task', taskRouter.getTasks, (req, res) => {
    res.status(200).json(res.locals.items);
})

app.post('/task', taskRouter.postTask, (req, res) => {
    res.status(200).json("Success: task is added.");
})

app.delete('/task', taskRouter.deleteTask, (req, res) => {
    res.status(200).json("Success: task is deleted.");
})

app.get('/secret', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
})

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
})

// show 404 page if nothing found
app.all('*', (req, res) => {
    res.status(404).send('Page Not Found');
})

// global error handler
app.use((err, req, res) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred'}
    }

    const errObj = Object.assign(defaultErr, err);
    console.log(errObj.log);
    res.status(errObj.status).json(errObj.message);
});

// start server
app.listen(PORT, () => {
    console.log(`Listenning to ${PORT}`);
})