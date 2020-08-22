const express = require ('express');
const app = express();
const path = require ('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController')

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('assets'));
// app.use(express.static('assets/js/index.js'))

app.get('/', (req, res) => {
   res.sendFile(path.resolve(__dirname, './../views/index.html'))
});
app.get('/secret', (req, res) => {
    res.sendFile(path.join(__dirname + './../views/secret.html'))
 });
app.get('/getTasks', taskController.getTasks, (req, res) => {
    res.status(200).json(res.locals.data)
})
app.post('/postTask', taskController.postTask, (req, res) => {
   res.status(200).json(res.locals.data)
})

//COMMENTING OUT B/C THROWING FATAL ERROR
// app.delete('/deleteTask', taskController.deleteTask, (req, res) => {
//     res.status(200).json(res.locals.data)
// })
app.listen(3333);