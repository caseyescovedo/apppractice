const express = require('express')
const path = require('path')
const app = express()
const PORT = 3333
const cookie = require('cookie-parser')
const taskController = require('./controllers/taskController.js')
const authControler = require('./controllers/authController.js')
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, '../views/index.html'))
});

app.get('/secret', (req,res)=>{
    res.sendFile(path.resolve(__dirname, '../views/secret.html'))
});


app.use('/', express.static('assets'));

app.post('/data', taskController.postTask);

app.get('/data', taskController.getTasks);

app.use('/signin', authControler.cookie, authControler.login, (req , res) => {
    res.redirect('/secret')
})

app.get('/data/:id', taskController.deleteTask)

app.use('*', (req, res) => {res.sendStatus(404)})

app.use((err, req, res, next) => {console.log('err' , err)})


app.listen(PORT, () => {console.log(`You are tuned into Port ${PORT}`)})

