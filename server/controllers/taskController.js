const Task = require('../models/TaskModel');

module.exports = {
  postTask: (req, res, next) => {
    const { itemText } = req.body;
    // Insert one new task document into the Tasks collection
    Task.create({ item: itemText }, (err, task) => {
      if (err) {
        console.log('taskController: Failed to insert a task into DB!');
        return next(err);
      }

      // Pass newly created document object along the middleware chain
      res.locals.task = task;
      return next();
    });
  },

  getTasks: async (req, res, next) => {
    try {
      // Find all documents in the Tasks collection
      // Use exec to have `find` operation return a promise
      // Resolves to a list of document objects (?)
      const tasks = await Task.find({}).exec();
      // Pass data along the middleware chain
      res.locals.tasks = tasks;
      console.log(`taskController: All tasks succesfully retrieved from DB!`);
      return next();
    } catch (err) {
      console.log('taskController: Failed to find all tasks in DB!');
      return next(err);
    }
  },

  deleteTask: async (req, res, next) => {
    try {
      const { taskId } = req.params;
      console.log(taskId);
      await Task.findByIdAndDelete(taskId);
      console.log(`Task with id ${taskId} successfully deleted!`);
      return next();
    } catch (err) {
      console.log('taskController: Failed to deleteOne task in DB!');
      return next(err);
    }
  },
};
