/*
## Serving the files
For this part you will be editing the `server/server.js` file.
- [ ] Create a Node.js HTTP server that listens on port 3333. (You may use Express if you'd like, but it is not necessary.)
- [ ] When you visit `http://localhost:3333/` in the browser, it should serve the `index.html` file from the `views` folder. This is the login page for the application.
- [ ] When you visit `http://localhost:3333/secret` in the browser, you should render the `secret.html` file from the `views` folder. This is the To-Do application
- [ ] You should also serve the CSS and JS that the html files are requesting. These are located in the `assets` folder. Make sure the `Content-Type` header is getting properly set in the HTTP response. (Some methods from some frameworks infer the content type from the file extension and set the header automatically.)
*/

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, '../assets')));

app.get('/secret', (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/secret.html'));
});

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/tasks', taskController.getTasks, (req, res) => {
    return res.status(200).json({tasks: res.locals.tasks});
});

app.post('/tasks', taskController.postTask, (req, res) => {
    return res.status(200).json({task: res.locals.task});
});

app.post('/remove', taskController.deleteTask, (req, res) => {
    return res.status(200).json({ task: res.locals.task });
});

app.get('*', (req, res) => {
    return res.status(404).send('Not found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

const PORT = 3333;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));