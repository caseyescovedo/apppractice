const express = require('express')
const path = require('path')
const router=require('./router')
const cookieParser = require('cookie-parser')
const authController = require('./controllers/authController')
const bodyParser = require('body-parser')
const app = express()
const PORT=3333

app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/task',router)
app.use('/signin',authController.login)
app.get('/secret',(req,res)=> res.sendFile(path.join(__dirname , '../views/secret.html')))
app.get('/',authController.sesion, (req,res)=> res.sendFile(path.join(__dirname , '../views/index.html')))
app.use(express.static(path.resolve(__dirname,'../assets'),))


app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Unknown error',
      status: 400,
      message: {
        err: 'An error occurred'
      },
    };
  
    const errorObj = Object.assign({}, defaultErr);
    errorObj.message = err.message;
    errorObj.log = err.log;
    const errorStatus = err.status || 404;
    return res.status(errorStatus).json(errorObj.message);
})



app.listen(PORT)