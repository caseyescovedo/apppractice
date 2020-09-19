const express = require('express');
const axios = require("axios");
const Task = require('../models/models.js')

taskControllers= {};

// get Tasks from mongoDB and send back to client
taskControllers.getTask = async (req, res, next) => {
  try{
    const myTask = await Task.find().exec();
    res.locals.getTask = myTask;
    console.log('got tasks from DB!!', myTask);
    return next();
  } catch (err) {
    return next(err);
  }
}

// post task obj data sent from client to mongoDB
taskControllers.postTask = async (req, res, next) => {
    console.log('reached controller')
  const { item, date, time, cost } = req.body;
  
  const myTask = new Task({ 
      item,
      date,
      time,
      cost
    }); 
    console.log(myTask)
    try {
     // save/post task obj info to db
      await myTask.save() 
      console.log('post complete myTask =', myTask)
      res.locals.postTask = myTask;
      return next();
    } 
    catch (err) {
        return next(err);
    }
}

// delete task from mongoDB by searching id(sent from client)
taskControllers.deleteTask = async (req, res, next) => {
  // NOTE: id is saved in req.params
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id).exec();
    res.locals.deleteTask = id;
    console.log('we have deleted task')
    return next();
  }
  catch (err) {
    return next(err);
  } 
}

module.exports = taskControllers;

