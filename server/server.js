const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());
app.use(express.static('assets'));

app.get('/', 
  taskController.createTable,
  (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'))
);

app.post('/signin',
  authController.verifyUser,
  (req, res) => res.redirect('/secret')
)

app.get('/secret', 
  authController.checkCookie,
  (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'))
);

app.get('/api/retrieve',
  taskController.getTasks,
  (req, res) => res.status(200).json(res.locals.tasks)
);

// Ive tried to debug this for 2 hours and have tried A LOT of solutions but i keep getting this error:
// SyntaxError: Unexpected token " in JSON at position 0 at JSON.parse(<anonymous>)
// or something very similar --> somehow i need the request header, but the request header also breaks the request
// another method i tried doesnt get this error but doesnt pass along the request body
app.post('/api/add',
  (req, res, next) => {
    console.log('before postTask req body ', req.body)
    return next()
  },
  taskController.postTask,
  (req, res) => res.status(200).json({})
)

app.get('/api/delete/:id',
  taskController.deleteTask,
  (req, res) => res.status(200).json()
)

app.get('*', (req, res) => res.status(404).send('404 Error: Page Doesn\'t Exist'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));