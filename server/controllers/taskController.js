const { json } = require("express");
const db = require("../models/TaskModel.js");

module.exports = {
  postTask: async (req, res, next) => {
    console.log("req.body: ", req.body);
    const newTask = `INSERT INTO tasks(item, created_at) VALUES ($1, $2)`;

    // destructuring the req.body object to get item and time
    const { item, created_at } = req.body;

    // setting a new array as parameters for the db.query
    const newItem = [item, created_at];

    // async request to the query
    try {
      const post = await db.query(newTask, newItem);
    } catch (err) {
      console.error(err);
    }
  },

  getTasks: async (req, res, next) => {
    console.log("in the beginning of get");
    // database query string
    const getAll = `SELECT * FROM tasks`;

    console.log("database: ", db);
    db.query(getAll)
      .then((data) => (res.locals.allTasks = data.rows))
      .then(() => next())
      .catch((err) => {
        console.log(err);
      });
  },

  deleteTask: async (req, res, next) => {
    // database query string
    const deleteItem = `DELETE FROM tasks WHERE item = $1`;

    // destructuring item from req.params
    const { item } = req.params;

    // create array of the item for the query
    const itemDelete = [item];

    try {
      // send query and item to the database
      const deleteItem = await db.query(deleteItem, itemDelete);
      return next();
    } catch (err) {
      console.error(err);
    }
  },
};
