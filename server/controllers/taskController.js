const db = require('../models/TaskModel');

module.exports = {
  postTask(req, res, next) {
    // POST
    console.log('POST');
    const text = 'INSERT into task (item) values ($1)';
    const param = [req.body.item];
    console.log('req', req.query);
    console.log(req.body.item); // this should be in the request body but I am strugging to pass that in using postman
    db.query(text, param, (err, response) => {
      // if err
      if (err) {
        return res.status(404).send('Error in inserting item into database');
      }
      console.log('Response: ', response.rows);
      return next();
    });
  },
  getTask(req, res, next) {
    // GET
    console.log('GET');
    const text = 'SELECT item FROM task';
    db.query(text, (err, response) => {
      if (err) {
        res.status(404).send('Error in getting items from database');
      }
      console.log('response obj: ', response.rows);
      res.locals.items = response.rows;
      return next();
    });
  },
  deleteTask(req, res, next) {
    // DELETE
    console.log('DELETE');
    const text = 'DELETE from task WHERE item = $1';
    const param = [req.body.item];
    console.log(param);
    db.query(text, param, (err, response) => {
      if (err) {
        // if it doesn't exist in database
        res.status(404).send('Error finding item in the database');
      }
      // go and get posts
      console.log('Response: ', response.rows);
      return next();
    });
  },
};
