const db = require("../models/TaskModel");

const taskController = {};

taskController.postTask = async (req, res, next) => {
  // write insert to make new task
  try {
    const insertQ = `INSERT INTO task (item) VALUES ('${req.body.item}') returning *`;
    const newTask = await db.query(insertQ);
    return res.status(200).json({ newTask: newTask.rows[0] });
  } catch (error) {
    return next({
      log: `taskController.postTask: ERROR: ${error}`,
      message: {
        err:
          "Error occurred in taskController.postTask. Check server logs for more details.",
      },
    });
  }
};

taskController.getTasks = async (req, res, next) => {
  try {
    const getQ = `select * from task;`;
    const allTasks = await db.query(getQ);
    return res.status(200).json(allTasks.rows);
  } catch (error) {
    return next({
      log: `taskController.getTasks: ERROR: ${error}`,
      message: {
        err:
          "Error occurred in taskController.getTasks. Check server logs for more details.",
      },
    });
  }
};

taskController.deleteTasks = async (req, res, next) => {
  try {
    const deleteQ = `DELETE FROM task WHERE id = ${req.params.id};`;
    await db.query(deleteQ);
    return res.status(200).json({ msg: "Task deleted!" });
  } catch (error) {
    next({
      log: `taskController.deleteTasks: ERROR: ${error}`,
      message: {
        err:
          "Error occurred in taskController.deleteTasks. Check server logs for more details.",
      },
    });
  }
};

module.exports = taskController;
