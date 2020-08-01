const model = require('../models/TaskModel.js');
const taskController = {};

taskController.postTask = (req, res, next) => {
  console.log('TASK CONTROLLER POST TASK')
  // grab the item to be posted from params
  const item = req.params.item
  // query will add the item to the "item" column and return the associated _id
  const queryText = `INSERT INTO "Tasks" (item) VALUES (${item}) RETURNING _id`
  model.query(queryText, item)
  .then((result) => {
    res.locals.data = result.rows[0];
    return next();
  })
  // log the error if one occurs
  .catch ((err) => {
     next({
      log: `error occurred at postTask middleware. error message: ${err}`,
    })
  })
};

taskController.getTask = (req, res, next) => {
  console.log('TASK CONTROLLER GET TASK')
  // query will return everything from the tasks table
  const queryText = `SELECT * FROM "public"."Tasks" LIMIT 100`
  model.query(queryText)
  .then((result) => {
    res.locals.data = result.rows;
    return next();
  })
  .catch ((err) => {
    next({
      log: `error occurred at getTask middleware. error message: ${err}`,
    })
  })
};

taskController.deleteTask = (req, res, next) => {
  console.log('TASK CONTROLLER DELETE TASK')
  const deleteID = req.params.deleteID
  // query will delete an item from the table based on _id (unique identifier)
  const queryText = `DELETE FROM "Tasks" WHERE _id = ${deleteID}`
  model.query(queryText, deleteID)
  .then((result) => {
    res.locals.data = result.rows[0];
    return next();
  })
  .catch ((err) => { // log the error if one occurs
    next({
      log: `error occurred at deleteTask middleware. error message: ${err}`,
    })
  })
};


module.exports = taskController;