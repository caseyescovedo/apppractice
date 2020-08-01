const Task = require('../models/TaskModel');
module.exports = {
  postTask,
  deleteTask, 
  getTasks
};

async function postTask(req, res, next){
  try {
    // Have not yet validated data. Will do later if have time. 
    console.log(req.body);
    const newTask = await Task.create(req.body);
    res.locals.newTask = newTask;
    next();
  } catch(errors) {
    console.log(errors);
    next(errors);
  }
}

async function deleteTask(req, res, next) {
  console.log(req.params);
  try {
    // Have not yet validated data. Will do later if have time.
    await Task.findByIdAndDelete(req.params.item_id);
    next();
  } catch (errors) {
    console(errors);
    next(errors);
  }
}


async function getTasks(req, res, next) {
  try {
    // Have not yet validated data. Will do later if have time.
    const allTasks = await Task.find({});
    // is it really necessary to pass to the server?
    // I think it's best to just send to the client right here
    res.locals.allTasks = allTasks;
    next();
  } catch (errors) {
    console.log(errors);
    next(errors);
  }
}