// Bring the TaskModel database in as Task
const Task = require('../models/TaskModel');

const taskController = {};

/* 
postTask creates a new item in database
*/

taskController.postTask = (req, res, next) => {
  // Item column from SQL table
  const { item } = req.body;

  const query = {
    text: `INSERT INTO public.task 
           VALUES($1) RETURNING *`,
    values: [item],
  };

  Task.query(query, (err, data) => {
    if (err) {
      console.log('ERROR FROM ADDING TASK: ', err);
    }
    console.log(`${data} successfully posted to database.`);
    return next();
  });
};

/*
getTasks should retrieve all items from database and send it back to the client as JSON
*/

taskController.getTasks = (req, res, next) => {
  const query = 'SELECT * FROM public.task;';

  Task.query(query, (err, data) => {
    if (err) {
      console.log('ERROR FROM GETTING ALL TASKS: ', err);
      return next(err);
    }
    // If successful, query will return data.rows
    const { rows } = data;

    res.locals.items = rows;

    return next();
  });
};

/*
deleteTask finds items in database based on _id and delete item (if it exists)
*/

taskController.deleteTask = (req, res, next) => {
  const { item_id } = req.params;

  const query = `DELETE FROM public.task
                 WHERE item_id=${item_id};`;

  Task.query(query, (err, data) => {
    if (err) {
      console.log('ERROR FROM DELETING TASK: ', err);
    }
    console.log(`Item Number ${item_id} successfully deleted in database`);
    return next();
  });
};

// Export taskController to be used outside of this file
module.exports = taskController;
