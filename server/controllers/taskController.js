const db = require('../models/TaskModel.js')

const taskController = {};

taskController.postTask  = async (req, res, next) => {
  const { task } = req.body;
  const postQuery = `INSERT INTO Task (_id, item) VALUES (uuid_generate_v4(), '${task}');`;
  try{
    await db.query(postQuery).then(response => {
      res.locals.newTask = task;
      return next();
    })
  } catch (err) {
    return next({
      message: `Error in taskController -> postTask: ${err}`,
    })
  }
}

taskController.getTasks  = async (req, res, next) => {
  const getQuery = 'SELECT * FROM Task;';
  try{
    await db.query(getQuery).then(response => {
      res.locals.allTasks = response.rows;
      return next();
    });
  } catch (err) {
    return next({
      message: `Error in taskController -> getTask: ${err}`,
    })
  }
}

taskController.deleteTask  = async (req, res, next) => {
  const { _id } = req.params;
  const deleteQuery = `DELETE FROM Task WHERE _id='${_id}';`;
  try{
    await db.query(deleteQuery).then(response => {
      res.locals.deletedTaskId = _id;
      return next();
    });
  } catch (err) {
    return next({
      message: `Error in taskController -> deleteTask: ${err}`,
    })
  }
}


module.exports = taskController;
