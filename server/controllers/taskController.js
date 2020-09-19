const db = require('../models/TaskModel');

const taskController = {};


taskController.getData = (req, res, next) => {
  const text = 'SELECT * FROM todo2';
  // perform the query 
  db.query(text)
  .then((data) => {
    // save the response we get back into the res.locals obj
    res.locals.info = data;
    // return next to return out of the middleware and move on to the next step
    return next();
  }) 
  // error handler
  .catch((err) => {
    console.log(err);
    return next(err);
  });
};


taskController.postData = (req, res, next) => {
  // we want information like item, info, date, and status from req.body, set those datapoints to variables.
  console.log(`req.body: ${req.body}`);
  const { item, description, date, status } = req.body;
  const values = [item, description, date, status];
  //query the databse, passing in the items that we received
  db.query(
    `INSERT INTO todo (item, description, date, status) VALUES ($1, $2, $3, $4) returning *`,
    values,
    (err, post) => {
      if (err) {
        return next(err);
      }
      // send response back to client saying we got ur info and here it is.
      res.locals.post = post.rows[0];
      return next();
    }
  );
};

module.exports = taskController;

