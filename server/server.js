const express  = require('express');
const app = express();
const PORT = 3333;
const path = require('path')
const controller = require('./controllers/taskController')

app.use(express.json());

const staticFile= path.resolve(__dirname,'../assets')
app.use('/',express.static(staticFile))

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../views/index.html'))
})
app.get('/secret',controller.createTable,(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../views/secret.html'))
})

app.post('/secret/post', controller.postTask,(req,res)=>{
    res.json(res.rows)
})

app.get('/secret/gettasks',controller.getTasks,(req,res)=>{
    
    const task=res.locals.tasks
    console.log(task)
   res.status(200).json({task}) 
})


app.delete('/secret/deletetask/:id',controller.deleteTask,(req,res)=>{
    res.json(res.locals.delete)
})




app.listen(PORT,console.log(`app is listening on port: ${PORT}`))