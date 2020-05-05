const express = require ('express')
const app = express()
const path = require ('path')
const PORT = 3333;
const taskController = require('./controllers/taskController')
const authController = require('./controllers/authController')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(express.static('assets'))
app.use(bodyParser())
app.use(cookieParser())


app.get('/', (req, res, next) => {
    return res.sendFile(path.resolve(__dirname, '../views/index.html'))
})

app.get('/secret', authController.checkCookie, (req, res, next) => {
    return res.sendFile(path.resolve(__dirname, '../views/secret.html'))
})


app.post('/posttask',authController.checkCookie, taskController.postTask, (req, res, next) => {
    return res.status(200).json(res.locals.addedTask)
})

app.get('/gettasks', authController.checkCookie, taskController.getTasks, (req, res, next) => {
    return res.status(200).json(res.locals.allTasks)
})

app.delete('/deletetask',authController.checkCookie, taskController.deleteTask, (req, res, next) => {
    return res.status(200).json(res.locals.deletedTask)
})

app.post('/signin', authController.verifyUser, authController.setCookie, (req, res, next) => {
    return res.status(200).redirect('/secret')
})

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'A global error has occurred', 
        status: 400, 
        err: { err: 'An error has occured in the server'}
    }
    Object.assign(defaultErr, err);
    console.log(err)
    res.status(defaultErr.status).json(defaultErr.err)
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})




module.exports = app;