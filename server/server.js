const express = require('express');
const app = express ();
const path = require('path')
const port = 3333;

app.use(express.static('assets'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

app.get('/secret', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'))
})

app.listen(port, () => {
    console.log('listening to port ' + port)
})
