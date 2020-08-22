const Task = require('../models/TaskModel.js')


module.exports = {

  postTask: async (req, res, next) => {
    const { item, created_at } = req.body;
    try {
      const newTask = await Task.create({ item, created_at })
      res.locals.newTask = newTask;
      console.log('posted new task: ', newTask);
      next()
    } catch (err) {
      console.log(`postTask ERRRORR: ${err}`)
    }
  },

  getTasks: async(req, res, next) => {
    try{
      const allTasks = await Task.find({});
      console.log('this is all tasks: ', allTasks)
      res.locals.allTasks = allTasks;
      next()
    } catch(err) {
      console.log(`getTask ERROR: ${err}`)
    }
  },

  deleteTasks: async(req, res, next) => {
    const {_id} = req.body;
    try{
      const deleted = await Task.findOneAndDelete({_id});
      console.log('this is the deleted task: ', deleted)
      res.locals.deleted = deleted;
      next()
    } catch(err) {
      console.log(`deletTask ERROR: ${err}`)
    }
  }
};
