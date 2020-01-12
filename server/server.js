const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const PORT = 3333;

const app = express();

const taskController = require('./controllers/taskController')
const authController = require('./controllers/authController')



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/assets/css', express.static(path.resolve(__dirname, '../assets/css')))
app.use('/assets/js', express.static(path.resolve(__dirname, '../assets/js')))

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/index.html'))
})

app.post('/signin', authController.verifyUser, authController.setCookie, (req, res) => {
    res.redirect('/secret')
})

app.get('/secret', auth, (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/secret.html'))
})
app.get('/secret/getTask', taskController.getTask, (req, res) => {
    res.status(200).json(res.locals.taskList)
})

app.post('/secret', taskController.postTask, (req, res) => {
    res.status(200).send('Task Created')
})

app.delete('/secret', taskController.deleteTask, (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/secret.html'))
})


function auth(req, res, next) {
    console.log(req.headers.cookie)
    if (req.headers.cookie.slice(6) === 'admin') {
        console.log('cookies have been verified')
        next();
    }
    else {
        res.send('You must be signed in to view this page')
    }
}

app.use('*', (req, res) => {
    res.status(404).send('Not Found');
});


// global error handeler
app.use((err, req, res, next) => {
    res.status(500).send('There was a global error')
})


app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`) })