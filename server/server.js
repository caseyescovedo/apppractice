const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3333;
const app = express();
const taskController = require('./controllers/taskController.js')
const authController = require('./controllers/authController.js')
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/secret.html')); 
})

app.get('/secret', 
taskController.getTasks, 
(req, res) => {
    res.status(200).json(res.locals.item)
})
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../views/index.html')); 
// })

app.post('/secret', 
// authController.checkCookie,
taskController.postTask, 
taskController.getTasks, 
(req, res) => {
    res.status(200).json(res.locals.item)
})

app.delete('/delete', 
taskController.deleteTask, 
taskController.getTasks, (req, res) => {
    res.status(200).json(res.locals.item)
})



app.use((req, res) => {
    return res.sendStatus(404)
})

//global error handling

app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!res.headerSent) {
        res.status(500)
        res.render(error, {error: err})
    }
})


app.listen(PORT, () => {
    console.log(`Server listening on port : ${PORT}`);

})

module.exports = app;