const express = require('express');
const app = express();
const PORT = 3333;
const path = require('path');
const taskController = require('./controllers/taskController')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const authController = require('./controllers/authController');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('assets'));
app.use(cors());
// routes
app.get('/tasks', taskController.getTasks, (req, res) => {
    return res.status(200).json(res.locals.data);
})

app.post('/tasks', taskController.postTask, (req, res) => {
    return res.status(200).json(res.locals.data);
})

app.delete('/tasks', taskController.deleteTask, (req, res) => {
    return res.status(200).json(res.locals.data);
})

// return pages
// app.use('/secret', authController.verifyUser, (req, res) => {
//     return res.status(200).sendFile(path.resolve(__dirname,'../views/secret.html'))
// })

app.use('/secret', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname,'../views/secret.html'))
})

app.use('/', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname,'../views/index.html'))
})

// 404 error
app.use('*', (req, res) => {
    return res.sendStatus(404);
})

// global error handler
app.use((req, res, next, err) => {
    const defaultErr = {
        log: 'Express error handler caught error in unknown middleware',
        status: 400,
        msg: {
            err: 'An error occurred'
        }
    }
    const errorObj = Object.assign({},defaultErr, err)
    console.log(errorObj);
})

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))
module.exports = app;