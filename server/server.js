const express = require('express');
const path = require('path');
const taskRoute  = require('./routes/tasks');

const app = express();
const port = 3333;
const { Pool } = require('pg');
const uri = 'postgres://brvcmuch:8fltCw5yexgum1WBxnsIEJFZROkU0vvP@isilo.db.elephantsql.com:5432/brvcmuch';

const pool = new Pool({connectionString: uri});

app.use(express.json());
app.use(express.static('assets'));
app.use((req, res, next) => {res.locals.pool = pool; next()});

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'));
});

app.use('/tasks', taskRoute);

app.use((err, req, res, next) => {
    res.status(500)
    res.render('error', { error: err })
});

app.listen(3333, () => console.log("listening on port 3333"));