const models = require('../models/TaskModel');

module.exports = {
  postTask: (req, res, next) => {
    models.Task.create(req.body)
      .then((response) => {
        res.locals.task = response;
        return next();
      })
      .catch((err) =>
        next({
          log: `taskController.postTask: ERROR: ${err.message}`,
          message: {
            err:
              'taskController.postTask: ERROR: Check server logs for details',
          },
        })
      );
  },

  getTasks: (req, res, next) => {
    models.Task.find({})
      .exec()
      .then((response) => {
        res.locals.tasks = response;
        return next();
      })
      .catch((err) =>
        next({
          log: `taskController.getTasks: ERROR: ${err.message}`,
          message: {
            err:
              'taskController.getTasks: ERROR: Check server logs for details',
          },
        })
      );
  },

  deleteTask: (req, res, next) => {
    const { id } = req.body;
    models.Task.deleteOne({ _id: id })
      .exec()
      .then((response) => {
        console.log('delete response is,', response);
        res.locals.task = response;
        return next();
      })
      .catch((err) =>
        next({
          log: `taskController.postTask: ERROR: ${err.message}`,
          message: {
            err:
              'taskController.postTask: ERROR: Check server logs for details',
          },
        })
      );
  },
};
