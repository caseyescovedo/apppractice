// const server = require('../server');
// const express = require('express');
// const app = express();
// const router = express.Router();
const Task = require('../models/TaskModel');

const taskController = {};

// I received multiple errors when trying to use a controller. I'm not sure if I needed to use express router


// taskController.postTask('/secret', (req, res, next) => {
//   console.log('in get /secret ');
//   res.locals.data = 'hello';
//   return next();
// });


module.exports = taskController;
