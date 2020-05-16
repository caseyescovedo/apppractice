const db = require('../models/TaskModel');

module.exports = {
  //create a new item in the database
  postTask: async (req, res, next) => {
    const { item } = req.body;

    //validate the input
    if (!item) {
      return res.status(400).send("Task content must not be empty.");
    }

    try {
      const result = await db.query(`INSERT INTO tasks (item) VALUES ($1) RETURNING *`, [ item ]);

      return res.status(201).json(result.rows[0]);
    } catch (err) {
      return next(err.stack);
    }
  },
  //retrieve all items from the database and send it back to the client as JSON
  getTasks: async (req, res, next) => {
    try {
      const result = await db.query(`SELECT * FROM tasks`);

      return res.status(200).json(result.rows);
    } catch (err) {
      return next(err.stack);
    }
  },
  //find items in the database based on an ID number and delete that item if it exists
  deleteTask: async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await db.query(`DELETE FROM tasks WHERE id = $1`, [ id ])

      return res.status(200).send()
    } catch (err) {
      return next(err.stack);
    }
  },
};
