const express = require('express');
const app = express();
const pool = require('./models/TaskModel');
const path = require('path');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
const PORT = 3333;
const router = require('./routes.js');
const cookieParser = require('cookie-parser');


const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const options = {
    setHeaders: function (res, path, stat) {
        res.set('Content-Type', 'text/html');
    }
};

app.use('/api', router);

app.use('/', express.static('assets', options));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.post('/signin', authController.login, authController.setCookie, authController.testCookie, (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.get('/secret', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});


app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`)
});

module.exports = app;