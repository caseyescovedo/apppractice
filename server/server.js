const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const authController = require('./controllers/authController')
const taskController = require('./controllers/taskController')
const PORT = 3333;

app.use(bodyParser.json());//convers json into javascript readable objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); //invoke
app.get('/',(req,res) => 
    res.status(200).sendFile(path.resolve(__dirname, `../views/index.html`))
);
//static file handlers\
//check path, console log the express object res, req, req.body, req.params
app.get('/secret',(req,res) => 
    res.status(200).sendFile(path.resolve(__dirname, `../views/secret.html`))
);
app.use('/',express.static(path.resolve(__dirname, '../assets' )));

app.get('/getAllTasks',taskController.getAllTasks,(req,res) => {
  console.log("server of line 22, res is", res)
  res.send(res.locals.tasks)
})


app.post('/createTask',taskController.createTask,
    (req,res,next) => {
        console.log("back in server.js line 29 ,res.locals is",res.locals)
  
        console.log("res.locals in se line 41")
        // res.locals.task=task;
         res.status(200).json(res.locals);
})

app.delete('/delete/:id',taskController.deleteTask,(req,res,next)=>{
  console.log("in line 36 server and id for req.params is", req.params);
})





//main get req
// app.use('/',(req,res) => res.status(200).sendFile(path.resolve(__dirname, '../views/secret')));

// app.use((req, res) => res.sendStatus(404));


// app.get('/',authController.setCookiie, (req,res) => {
//       res.render('../views/index.html')
// });


// //signup
// app.get('/signup',(req, res) => {
//   res.render('../views/index.html',{ error: null });
// });

//chanin of controller middle events when signing up 
//all related methods in authController
// app.post('/signup',
//   authController.createUser,
//   authController.setSSIDCookie,
//   authController.startSession,
//   (req,res) => {
//     res.redirect('/secret')
//   }
// );

// app.post('/login',
// authController.verifyUser,
// authController.setSSIDCookie,
// authController.startSession,
// (req, res) => {
//   res.redirect('/secret');
// }
// );


// app.get('/secret',authController.isLoggedIn,authController.getAllUsers, (req, res) => {
//   res.render('../views/secret.html',{ users: res.locals.users }); //send back a response object
// });




//global error handler
// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 400,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });
app.use(`/*`,(req,res) => res.sendStatus(404))





//startthe server listening on 3333
app.listen(PORT, () => {
  console.log(`Server is on port: ${PORT}`);

});

module.exports = app;
