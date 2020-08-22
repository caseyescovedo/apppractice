const mongoose = require('mongoose');
const User = require('../models/TaskModel');

const taskController = {};

// Function postTask should create a new item in the database
taskController.postTask = async (req, res, next) => {
  console.log('this is reqbody: ', req.body);
  const { username, task } = req.body;
  const newMongooseId = mongoose.Types.ObjectId();
  // console.log('newMongooseId is: ', newMongooseId);
  const taskWithTime = {
    _id: newMongooseId,
    title: task,
    created_at: Date.now(),
  };

  try {
    const data = await User.findOneAndUpdate({ username },
      { $push: { todo: taskWithTime } },
      { upsert: true, new: true });
    // res.locals.newTodo = data;
    // console.log(res.locals.newTodo);
    res.locals.newTodoId = { itemId: newMongooseId };
    next();
  } catch (err) {
    console.log('error at postTask: ', err);
    next(err);
  }
};

// Function getTasks should retrieve all items from the database and send it back to the client as JSON
taskController.getTasks = async (req, res, next) => {
  const { username } = req.params;
  try {
    const data = await User.findOne({ username });
    // console.log(data);
    res.locals.allTasks = data.todo;
    next();
  } catch (err) {
    console.log('error at getTasks: ', err);
    next(err);
  }
};

// Function deleteTask should find items in the database based on an ID number and delete that item if it exists
taskController.deleteTask = async (req, res, next) => {
  console.log('this is req.params: ', req.params);
  const { username, itemId } = req.params;
  // const { itemId } = req.params;
  // console.log(itemId);

  try {
    const data = await User.findOneAndUpdate({ username },
      { $pull: { todo: { _id: itemId } } },
      { new: true });

    // const data = await User.findOneAndDelete({ _id: itemId });
    res.locals.newTodo = data;
    console.log(res.locals.newTodo);
    next();
  } catch (err) {
    console.log('this is error at todo.update');
    next(err);
  }
};

// taskController.update = async (req, res, next) => {
//   console.log('this is reqbody: ', req.body);
//   const { username, todo } = req.body;

//   try {
//     const data = await User.findOneAndUpdate({ username }, { todo });
//     res.locals.newTodo = data;
//     console.log(res.locals.newTodo);
//     next();
//   } catch (err) {
//     console.log('this is error at todo.update');
//     // next(err);
//   }
// };

module.exports = taskController;
