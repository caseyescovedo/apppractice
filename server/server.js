const express = require('express');
const app = express();
const path = require('path');

const PORT = 3333;

app.use('/css/style.css', express.static(path.join(__dirname,'../assets/css/style.css')))
app.use('/js/index.js', express.static(path.join(__dirname,'../assets/js/index.js')))

app.get('/secret', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'))
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'))
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

app.post('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'))
})

app.use('*', (req, res) => {
    res.sendStatus(404)
})

app.use((err, req, res, next) => {
    consol.log(err);
    res.status(500).json({err:'If you see this I failed probably'})
})

app.listen(PORT,() => console.log(`Server listening at ${PORT}`))