const express = require('express');
const path = require('path')

const taskController = require('./controllers/taskController')
const app = express();
const port = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
// app.use(cookieParser())

//SERVING STATIC FILES
app.use('/', express.static(path.join(__dirname, '../views')))
app.use('/', express.static(path.join(__dirname, '../assets')))
app.use('/secret', express.static(path.join(__dirname, '../assets')))


//SERVING SECRET
app.get('/secret', (req,res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'))
})


//SERVING INDEX
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})


//------------------------ROUTES-------------------------//


//GET
app.get('/tasks', taskController.getTasks, (req,res)=> {
  res.json(res.locals.tasks)
})

//POST
app.post('/tasks', taskController.postTask, (req, res) => {
  res.send(res.locals.tasks)
})

//DELETE
app.delete('/tasks', taskController.deleteTask, (req, res) => {
  res.json(res.locals.tasks)
})



//DEFAULTS
app.use('*', (req, res) => {
  res.sendStatus(404)
});

app.use((err,req,res,next) => {
  console.log(err);
  res.sendStatus(500)
})

app.listen(port, () => console.log(`The server is listening on port:${port}`))