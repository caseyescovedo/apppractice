const express = require('express');
const app = express()
const path = require('path')

app.use(express.json());

app.get('*', express.static(path.join(__dirname, '../assets')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

app.get('/secret', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'))
})

app.listen(3333, () => console.log('Listening on port 3333'))