const Task = require('../models/TaskModel');

module.exports = {
  postTask: async (req, res, next) => {
    try {
      const { task } = req.body;

      const newTask = {
        task,
      };
      await Task.create(newTask);
      const sendTastBack = awaitTask
        .findOne({
          task,
        })
        .exec();

      res.locals.task = sendTastBack;
      next();
    } catch (err) {
      res.status(418);
    }
  },

  getTasks: async (req, res, next) => {
    try {
      const foundTasks = await Task.find({}).exec();

      if (!foundTasks) {
        res.status(418);
      } else {
        res.locals.foundTasks = foundTasks;
        console.log('foundTask', res.locals.foundTasks);
        next();
      }
    } catch (err) {
      console.log(err);
      res.status(418);
    }
  },

  //   deleteTask: async (req, res, next) => {
  //     try {
  //       const taskToDelete = req.params.id;
  //       const deletedTask = await Task.deleteOne(taskToDelete).exec();

  //       if (!deletedTask.acknowledged) {
  //         res.status(418);
  //       } else {
  //         console.log('task deleted');
  //         next();
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       res.status(418);
  //     }
  //   },
};
