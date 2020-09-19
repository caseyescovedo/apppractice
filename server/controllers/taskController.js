const express = require('express');
const axios = require("axios");
const Task = require('../models/models.js')

taskControllers= {};

taskControllers.getTask = (req, res, next) => {
  axios.get('/api/getTask')
    .then(res => res.json())
    .then(data => {
        res.locals.getTask = data;
        return next();
    }).exec() // needed for catch - mongoose does not return a true promise
    .catch((err) => {
        console.log(err);
        return next(err)
    })
}

taskControllers.postTask = async (req, res, next) => {
    console.log('reached controller')
  const { task, date, time, cost } = req.body;
  
  const myTask = new Task({ 
      task,
      date,
      time,
      cost
    }); 
    console.log(myTask)
    try {
      await myTask.save() // save to db
      console.log('post complete myTask =', myTask)
      res.locals.postTask = myTask;
      return next();
    } catch (err) {
        return next(err);
    }
}


// taskControllers.postTask = () => {
//     console.log('reached controller')
//   const { task, date, time, cost } = req.body;
//     axios.post('/api/postTask', {
//         task: task,
//         date: date,
//         time: time,
//         cost: cost,
//     })
//     .then(res => res.json())
//     .then( data => {
//         res.locals.postTask = data;
//         console.log('reached after axios post')
//         return next();
//     }).exec()
//     .catch((err) => {
//         console.log(err);
//         return next(err);
//     })
// }

taskControllers.deleteTask = () => {

    const task = req.body.task;
    axios.delete('/api/deleteTask', {
    // how to refer to specific one
    task: task,
    })
    .then(res => res.json())
    .then(data => {
        res.locals.deleteTask = data;
    }).exec()
    .catch((err) => {
        console.log(err);
        return next(err);
    })
}


module.exports = taskControllers;
