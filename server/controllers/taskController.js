const db = require('../models/TaskModel.js');

const taskController = {};

taskController.postTask = async (req, res, next) => {
  try {
    await db.query(`insert into task (item) values ('${req.body.task}')`);
    console.log('Task added to database');
    return next();
  } catch (error) {
    return next('Error in post task:', error);
  }
};

taskController.getTasks = async (req, res, next) => {
  try {
    const tasks = await db.query(`select * from task`);
    res.locals.tasks = tasks.rows;
    return next();
  } catch (error) {
    return next('Error in get tasks:', error);
  }
};

taskController.deleteTask = async (req, res, next) => {
  try {
    await db.query(`delete from task where itemid='${req.body.id}'`);
    console.log('Item deleted from database');
    return next();
  } catch (error) {
    return next('Error in delete task:', error);
  }
};

//was just playing around with an update feature :) you can uncomment out to see how it works!
// taskController.updatetask = async (req, res, next) => {
//   try {
//     await db.query(
//       `update task set item = '${req.body.text}' where itemid='${req.body.id}'`,
//     );
//     console.log('updated item in database');
//   } catch (error) {
//     return next('Error in update task');
//   }
// };
module.exports = taskController;
