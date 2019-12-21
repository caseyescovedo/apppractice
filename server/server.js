const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser')

const taskController = require('./controllers/taskController')
const authControler = require('./controllers/authController')
const app = express();
const port = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())

//SERVING STATIC FILES
app.use('/secret', express.static(path.join(__dirname, '../assets')))
app.use('/', express.static(path.join(__dirname, '../views')))
app.use('/', express.static(path.join(__dirname, '../assets')))

//SERVING INDEX
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

//SERVING SECRET
app.get('/secret',authControler.checkCookie, (req,res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'))
})

//------------------------ROUTES-------------------------//

//LOGIN
app.post('/signin', (req,res) => {
  console.log(req.body.user)
  if (req.body.user=== "codesmith" && req.body.pass==="ilovetesting") {
    console.log('ggod pass')
    res.cookie('token', 'admin', {httpOnly: true})
    return res.redirect('/secret')
  } else {
    console.log('bad pass')
    res.send('unsuccessful login attempt')
    
  }
})

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