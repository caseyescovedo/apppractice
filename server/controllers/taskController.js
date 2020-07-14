const Task = require('../models/TaskModel');

const postTask = (req, res, next) => {
  const { itemName } = req.body;
  Task.create({
    item: itemName,
    created_at: Date.now(),
  })
    .then((result) => {
      console.log('the new item', result);
      res.status(201).send({
        message: 'task created',
      });
    })
    .catch((e) => {
      next(e);
    });
};

const getTasks = (req, res, next) => {
  Task.find({})
    .exec()
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      next(e);
    });
};

const deleteTask = (req, res, next) => {
  const { id } = req.params;
  Task.findByIdAndDelete(id)
    .exec()
    .then((result) => {
      res.status(200).send({
        message: 'deleted',
      });
    });
};

module.exports = {
  postTask,
  getTasks,
  deleteTask,
};
