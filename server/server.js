const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const taskRoute  = require('./routes/tasks');
const authController = require('./controllers/authController');

const app = express();
const port = 3333;
const { Pool } = require('pg');
const uri = 'postgres://brvcmuch:8fltCw5yexgum1WBxnsIEJFZROkU0vvP@isilo.db.elephantsql.com:5432/brvcmuch';

const pool = new Pool({connectionString: uri});

/* basic setup of parsing req fields into easier parts to work with */
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

/* server our asset files, framework automatically includes file extension types in the http headers */
app.use(express.static('assets'));

/* sending index html path on root path */
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

/* sending secret html path on the root path to our authorized user */
app.get('/secret', authController.authorize, (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'));
});

/* connecting taskRoute which will connect to taskControllers, onto the /tasks path */
app.use('/tasks', taskRoute);

/* make sure our user is who he says he is */
app.post('/signin', authController.authenticate);

/* global error handler */
app.use((err, req, res, next) => {
    res.status(500);
    res.json({ error: err });
});

app.listen(port, () => console.log(`listening on port ${port}`));