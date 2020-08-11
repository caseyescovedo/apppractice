const models = require("../models/TaskModel");

const Task = models.Task;

// const models = require("../models/TaskModel");
const taskController = {};

//Function postTask should create a new item in the database
taskController.postTask = async (req, res, next) => {
  console.log("in postTask");
  console.log("req.body", req.body);

  const newTask = new Task({
    item: req.body.item
  });

  await newTask
    .save()
    .then(doc => {
      res.locals.id = doc._id;
      // console.log("success:", doc);
    })
    .catch(err => {
      console.log("error adding Task:", error);
    });

  next();
};

//Function getTasks should retrieve all items from the database and send it back to the client as JSON
taskController.getTasks = async (req, res, next) => {
  console.log("in getTasks");

  const tasks = await Task.find();

  // success
  if (Array.isArray(tasks)) {
    if (tasks.length === 0) {
      res.locals.message = "no tasks";
      return res.status(200).json(tasks);
    } else {
      res.locals.message = "success";
      return res.status(200).json(tasks);
    }

    // Error
  } else {
    return res.send("Error in Array not returned from query");
  }
};

//Function deleteTask should find items in the database based on an ID number and delete that item if it exists
taskController.deleteTask = async (req, res, next) => {
  console.log("in deleteTask");
  console.log("req.body.id", req.body.id);

  const id = req.body.id;
  console.log("id", id);
  // const id = "5f0a2a25965dfa5aab6decc9";

  const deleted = await Task.findOneAndDelete({ _id: `${id}` })
    .then(doc => {
      console.log("successfully deleted");
    })
    .catch(err => {
      console.log("Error", err);
    });

  next();
};

module.exports = taskController;
