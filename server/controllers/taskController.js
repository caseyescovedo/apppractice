const model = require('../models/TaskModel.js');
const taskController = {};

taskController.postTask = (req, res, next) => {
  // grab the item to be posted from params
  const item = req.params.item
  // query will add the item to the "item" column and return the associated _id
  queryText = `INSERT INTO "Tasks" (item) VALUES (${item}) RETURNING _id`
  try {
    // wait for response
    const query = await model.query (queryText);
    console.log("postTask query response: ", query);
    // pull out value from response and save it to locals
    res.locals.newItemID = query.rows;
  } catch (err) { // log the error if one occurs
    return next({
      log: `error occurred at postTask middleware. error message: ${err}`,
    })
  }
};

taskController.getTask = (req, res, next) => {
  // query will return everything from the tasks table
  queryText = `SELECT * FROM "public"."Tasks" LIMIT 100`
  try {
    // wait for response
    const query = await model.query (queryText);
    console.log("getTask query response: ", query);
    // pull out value from response and save it to locals
    [res.locals.items] = query.rows;
  } catch (err) { // log the error if one occurs
    return next({
      log: `error occurred at getTask middleware. error message: ${err}`,
    })
  }
};

taskController.deleteTask = (req, res, next) => {
  const deleteID = req.params.deleteID
  // query will delete an item from the table based on _id (unique identifier)
  queryText = `DELETE FROM "Tasks" WHERE _id = ${deleteID}`
  try {
    // wait for response
    const query = await model.query (queryText);
    console.log("deleteTask query response: ", query);
    // pull out value from response and save it to locals
    [res.locals.items] = query.rows;
  } catch (err) { // log the error if one occurs
    return next({
      log: `error occurred at deleteTask middleware. error message: ${err}`,
    })
  }
};


module.exports = taskController;