const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const PORT = 3333;
const taskController = require('./controllers/taskController.js')
const authController = require('./controllers/authController.js')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})
// app.use('/assets', express.static(path.join(__dirname, '../assets')))
app.get("/css/style.css", (req, res) => {
    res
        .type("application/json")
        .sendFile(path.resolve(__dirname, "../assets/css/style.css"));
});
app.get("/js/index.js", (req, res) => {
    res
        .type("application/json")
        .sendFile(path.resolve(__dirname, "../assets/js/index.js"));
});

//
// app.post('/', authController.login, (req, res) => {
//     res.redirect('/secret')
// })
//
app.get('/secret', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'))
})

app.post('/postTask', taskController.postTask, (req, res) => {
    res.status(200).json(res.locals.result)
})

app.get('/getTasks', taskController.getTasks, (req, res) => {
    res.status(200).json(res.locals.result);
})

app.delete('/deleteTask/:id', taskController.deleteTask, (req, res) => {
    res.status(200).json(res.locals.result);
})

app.get('*', (req, res) => {
    res.status(400).json(console.log('error'))
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
app.listen(PORT, () => console.log(`app listening on port ${PORT}!`))