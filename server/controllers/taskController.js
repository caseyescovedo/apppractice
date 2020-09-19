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
    })
    .catch((err) => {
        console.log(err);
        return next(err)
    })
}

taskControllers.postTask = () => {
  const { task, date, time, cost } = req.body;
    axios.post('/api/postTask', {
        task: task,
        date: date,
        time: time,
        cost: cost,
    })
    .then(res => res.json())
    .then( data => {
        res.locals.postTask = data;
        return next();
    })
    .catch((err) => {
        console.log(err);
        return next(err);
    })
}

taskControllers.deleteTask = () => {

    const task = req.body.task;
    axios.delete('/api/deleteTask', {
    // how to refer to specific one
    task: task,
    })
    .then(res => res.json())
    .then(data => {
        res.locals.deleteTask = data;
    })
    .catch((err) => {
        console.log(err);
        return next(err);
    })
}


module.exports = taskControllers;
