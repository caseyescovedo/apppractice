const express = require('express');
const path = require('path');

const app = express();
const port = 3333;

app.use(express.static('assets'));
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'));
});

app.listen(3333, () => console.log("listening on port 3333"));