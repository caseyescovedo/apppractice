const db = require('../models/TaskModel');

const controller = {};

// this works fine
// console.log('made it into task controller');

controller.getTasks = (err, req, res, next) => {
  console.log('trying to get a task');
  // retrieve all items from the database and send back to the client as JSON
  // many expects one or more rows to be returned
  db.query('select * from Tasks')
    .then((result) => JSON.parse(result))
    .then((data) => res.status(200).json(data))
    .catch((error) => next(error));
  // invoke next so we can move on
  next();
};

controller.postTask = (err, req, res, next) => {
  console.log('trying to post a task');
  // check to see if we got the item description. if we didn't, we can't do anything!
  if (req.query.description) {
    console.log(req.query.description);
    // get task description from request object
    const taskDescription = req.query.description;
    // create a new item in the database
    const queryString = `INSERT INTO Tasks(item) VALUES(${taskDescription});`;
    // .none expects no rows to be returned
    db.query(queryString)
      .then((res.status(200).json({ message: 'task successfully added to to-dos' })))
      .catch((error) => next(error));
    // send back something (for testing)
    res.locals.test = 'hello';
    // invoke next so we can move on
    next();
  } else { // *need to verify that this will work, I'm not sure it will
    next(err);
  }
};

controller.deleteTask = (err, req, res, next) => {
  // find items based on ID number and delete it if it exists
  if (req.params.id) {
    // result responds with the original thing we sent in IF all goes well
    db.query(`DELETE FROM Tasks WHERE id=${parseInt(req.params.id, 10)}`)
      .then((result) => res.status(200).json({ message: `deleted item number ${result.id} from table` }))
      .catch((error) => next(error));
  } else { // *need to verify that this will work, I'm not sure it will
    next(err);
  }
  // invoke next so we can move on
  next();
};

module.exports = controller;
