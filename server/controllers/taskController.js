const pool = require('../models/TaskModel');
module.exports = {
  postTask: (req, res, next) => { // post middleware
    const { item } = req.body;
    const query = `INSERT INTO "Tasks" (item) VALUES ($1) RETURNING *`; // after insert, return the inserted value
    pool.query(query, [ item ], (err, doc) => { // query
      if (err) return next({ // if error on insert
        statusCode: 500,
        message: 'Error on creating data',
        error: err
      });
      res.locals.data = doc.rows[0]; // save data on locals
      return next();
    });
  },
  getTasks: (req, res, next) => {
    const query = `SELECT * FROM "Tasks"`; // select all data from Tasks table
    pool.query(query, (err, doc) => {
      if (err) return next({ // if error on read
        statusCode: 500,
        message: 'Error on reading data',
        error: err
      });
      res.locals.data = doc.rows; // save data on locals
      return next();
    });
  },
  deleteTask: (req, res, next) => {
    const { id } = req.body;
    const query = `DELETE FROM "Tasks" WHERE _id = $1`; // delete data with id from client
    pool.query(query, [ id ], (err, doc) => {
      if (err) return next({ // if error on delete
        statusCode: 500,
        message: 'Error on deleting data',
        error: err
      });
      return next();
    });
  }
};
