const { Tasks } = require('../models/TaskModel');

async function allTasks() {
  try {
    const allTasks = await Tasks.find({}, { __v: 0 });
    return allTasks;
  } catch (err) {
    return [];
  }
}

module.exports = {
  postTask: async (req, res, next) => {
    const { item } = req.body;
    if (!item) {
      return next({ log: 'No task provided' });
    }
    try {
      await new Tasks({
        item,
      }).save();
      const tasks = await allTasks();
      res.locals.tasks = tasks;
      return next();
    } catch (err) {
      console.log('Error creating task :: ', err);
      return next({ error: err });
    }
  },
  getTasks: async (req, res, next) => {
    const tasks = await allTasks();
    res.locals.tasks = tasks;
    return next();
  },
  deleteTask: async (req, res, next) => {
    const { _id } = req.params;
    if (!_id) {
      return next({ log: 'Please provide the id of task to be deleted' });
    }
    try {
      await Tasks.findByIdAndRemove({ _id });
      const tasks = await allTasks();
      res.locals.tasks = tasks;
      return next();
    } catch (err) {
      res.locals.tasks = [];
      console.log('Error deleting task :: ', err);
      return next({ error: err });
    }
  },
};
