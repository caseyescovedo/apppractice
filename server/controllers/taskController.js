const db = require('../models/TaskModel.js')

const taskController = {};

taskController.postTask = async (req, res, next) => {
  
  const taskToInsert = req.query.newtask;

  const timeObj = new Date();
  const convertedTimeObj = timeObj.toISOString();
  const slicedTime = convertedTimeObj.slice(0, 19);
  const finalTime = slicedTime.replace('T', ' ');

  const queryMsg = `
    INSERT INTO Task (item, created_at)
    VALUES ('${taskToInsert}', '${finalTime}');
    `
  try {
    await db.query(queryMsg);
    return next();
  } catch(err) {
    console.log('Error with inserting new task into database: ', err);
    return next('Error with the database');
  }

}

taskController.getTasks = async (req, res, next) => {

  const queryMsg = `
    SELECT * FROM Task;
    `
  
  try {
    const result = await db.query(queryMsg);
    res.locals.tasks = result.rows;
    return next();
  } catch (err) {
    console.log('Error with retrieving all tasks into database: ', err);
    return next('Error with the database');
  }
}

taskController.deleteTask = async (req, res, next) => {
  
  const itemToDelete = req.query.itemid;

  const queryMsg = `
  DELETE FROM task
  WHERE id = ${itemToDelete};
  `
  
  try {
    await db.query(queryMsg);
    return next();
  } catch(err) {
    console.log('Error with trying to delete task from database: ', err)
    return next('Error with the database');
  }
}

module.exports = taskController;
