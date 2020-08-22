const db = require('../models/TaskModel.js')

const taskController = {};

taskController.postTask = async (req, res, next) => {
  
  // need to grab the right task here.
  // might need to wrap NOW around quotes

  const now = new Date();
  const queryMsg = `
    INSERT INTO Task (item, created_at)
    VALUES ('I am a new task', ${now});
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
    SELECT * FROM Task
    RETURNING *;
    `
  
  try {
    const result = await db.query(queryMsg);
    res.locals.tasks = result;
    return next();
  } catch (err) {
    console.log('Error with retrieving all tasks into database: ', err);
    return next('Error with the database');
  }
}

taskController.deleteTask = async (req, res, next) => {
  // need to figure out how to delete tasks based on ID number...??
  console.log('hi I am the deleteTask controller');
  return next();
}

module.exports = taskController;
