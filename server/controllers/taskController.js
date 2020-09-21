// Note: I'm not adding next() to these contorllers because in the readme it states: 
  //In the server/models/taskController.js file, add the following functionality to the exported controller. (These will be server middleware/final handler functions, so they should take the appropriate parameters and perform the necessary callback operations.):
//by final handlers, i'm assuming we're never going to chain these middlewares, therefore, 
//there is no reason to pass next in nor invoke it had it been passed in
//also, we don't have a middleware handler, which would need the error passed into next


const db = require('../models/TaskModel.js'); 

module.exports = {
  postTask: (req, res) => {
    const { item } = req.body;
    const values = [item];
    const queryString = `INSERT INTO Task (item)
                         VALUES ($1)`;
    db.query(queryString, values)
      // .then(res => console.log(res))
      .then(response => res.sendStatus(201))
      .catch(err => console.log(err));
  },
  getTasks: (req, res) => {
    const queryString = `SELECT * FROM Task`
    db.query(queryString)
      .then(response => res.json(response.rows))
      .catch(err => console.log(err));
  },
  deleteTask: (req, res) => {
    //the id will probably come in on the req object, just ddon't know where yet
    //for now, we're going to just delete _id 1
    console.log(req.body._id)
    const { _id } = req.body
    const values = [_id]
    const queryString = `DELETE FROM Task WHERE _id=$1`;
    db.query(queryString, values)
      .then(response => res.sendStatus(202))
      .catch(err => console.log(err));
  }
};
