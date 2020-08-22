const queries = require("../queries");

const taskController = {};

taskController.postTask = (req, res, next) => {
  // console.log("req.cookie: ", req.cookies)
  console.log("req.body: ", req.body)
  console.log("req.query: ", req.query)
  console.log("req.params: ", req.params)
  const { item, created_at } = req.body;

  const queryString = `INSERT INTO Tasks (item, created_at) 
  VALUES ($1, $2) RETURNING item`;
  const queryValues = [item, created_at];

  db.query(queryString, queryValues)
    .then(data => {
      console.log('taskController.postTask data.rows: ', data.rows[0]);
      // query returns itemObj: [{ item: 'eat' }]
      res.locals.item = data.rows[0] // this doesn't go anywhere
      return next();
    })
    .catch(err => {
      console.log(`An error occurred in taskController.postTask while creating item: ${err}`);
      return;
    })
  console.log('last line of taskController.postTask');
}

taskController.getTasks = (req, res, next) => {
  // console.log("req.cookie: ", req.cookies)
  console.log("req.body: ", req.body)
  console.log("req.query: ", req.query)
  console.log("req.params: ", req.params)

  const queryString = `SELECT * FROM Tasks`;

  db.query(queryString)
    .then(data => {
      console.log('taskController.getTasks data.rows: ', data.rows[0]);
      // query returns all itemObj: [{ item: 'eat', created_at }, { item: 'drink' }, { item: 'sleep' }]
      res.locals.tasks = data.rows[0]
      return next();
    })
    .catch(err => {
      console.log(`An error occurred in taskController.getTasks while creating item: ${err}`);
      return;
    })
  console.log('last line of taskController.getTasks');
}

taskController.deleteTask = (req, res, next) => {
  // console.log("req.cookie: ", req.cookies)
  console.log("req.body: ", req.body)
  console.log("req.query: ", req.query)
  console.log("req.params: ", req.params)
  const { item, created_at } = req.body;

  const queryString = `DELETE FROM Tasks WHERE item=$1`;
  const queryValues = [item];

  db.query(queryString)
    .then(data => {
      console.log('taskController.getTasks data.rows: ', data.rows[0]);
      // query returns all itemObj: [{ item: 'eat', created_at }, { item: 'drink' }, { item: 'sleep' }]
      res.locals.tasks = data.rows[0]
      return next();
    })
    .catch(err => {
      console.log(`An error occurred in taskController.getTasks while creating item: ${err}`);
      return;
    })
  console.log('last line of taskController.getTasks');
}






module.exports = taskController;
