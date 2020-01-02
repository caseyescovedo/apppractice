const path = require('path');
const express= require('express');
const app = express();
const PORT = 3333;
let flash = require('req-flash');
const cookieParser = require('cookie-parser')
const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');
app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser());
app.use('/', express.static(path.resolve(__dirname,'../assets')))
app.use('/secret', authController.cookieMonster,(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../views/secret.html'));
})
app.delete('/deleteTask',taskController.deleteTask,(req,res)=>{
    res.sendStatus(200);
})
app.get('/getTasks',taskController.getTasks,(req,res)=>{
    console.log(res.locals.items)
    res.json(res.locals.items)
})
app.post('/signin',authController.check,(req,res)=>{
    res.send(res.locals.message);
    // res.redirect('/');
})
app.post('/postTask', taskController.postTask,(req,res)=>{
    res.sendStatus(200);
})
app.use('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../views/index.html'));
})

app.listen(PORT, ()=>{console.log(`listening on ${PORT}`)});