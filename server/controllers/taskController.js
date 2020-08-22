const { Task } = require('./TaskModel.js');

/*
  ^^^ I put TaskModel in the controller folder because for whatever reason it didn't like the file path require('../models/TaskModel.js')
*/

module.exports = {

  // create new item in the database
  postTask: async (req, res, next) => {
    const { item, createdAt } = req.body
    try {
      await Task.create({
        item,
        createdAt,
      })
      .then (data => {
        console.log('task created: ', data)
        next();
      })
    }
    catch (err) {
      console.log('error in postTask: ', err)
      return next();
    }
  },

  // retrieve all items from the database and send back to the client as JSON
  getTasks: async (req, res, next) => {
    try {
      await Task.find({})
      .then(data => {
        res.locals.tasks = data;
        console.log('found tasks: ', res.locals.tasks)
        next();
      })
    }
    catch (err) {
      console.log('error in getTasks: ', err)
      return next();
    }
  },

  // find items based on ID number and delete item if it exists
  deleteTask: async (req, res, next) => {
    console.log('req.params:', req.params)
    const {id} = req.params
    try {
      await Task.deleteOne({ _id: id }, (err) => {
        if (err) {
          console.log('item does not exist (deleteTask)')
          return next(err); // if it doesn't exist return error
        }
      })
      .then(data => {
        console.log('successfully deleted')
        next();
      })
    }
    catch (err) {
      console.log('error in deleteTask: ', err)
      return next();
    }
  },

};
