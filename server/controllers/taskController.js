const { Task, db } = require('../models/TaskModel');

const postTask = async (req, res) => {
  const { taskData } = req.body;
  const todoTask = new Task({
    item: taskData,
  });
  try {
    await todoTask.save();
    res.redirect('/secret');
  } catch (err) {
    res.redirect('/');
  }
};

const getTasks = async (req, res) => {
  await Task.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('result', result);
      res.json({ result });
    }
  });
};

module.exports = { postTask, getTasks };
