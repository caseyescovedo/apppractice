const express = require('express');
const taskController = require('../controllers/taskController');
const secretRouter = express.Router();
const path = require('path');
const authController = require('../controllers/authController');

secretRouter.use(express.static('assets'));

secretRouter.use('/addTask', taskController.postTask, (req, res) => {
    console.log(res.locals.message);
    res.status(200).json(res.locals.message);
})
secretRouter.use('/getTasks', taskController.getTasks, (req, res) => {
    console.log(res.locals.message);
    res.status(200).json(res.locals.message);
})
secretRouter.use('/deleteTask', taskController.deleteTask, (req, res) => {
    console.log(res.locals.message);
    res.status(200).json(res.locals.message);
})

secretRouter.use('/', authController.checkCookie, (req, res) => {
    res.set('html').sendFile(path.resolve(__dirname, '../../views/secret.html'), (err) => {
        if (err) res.status(400).json("There was an error loading the home page.");
    })
})


module.exports = secretRouter;