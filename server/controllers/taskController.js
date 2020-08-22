const db = require('../models/TaskModel')


module.exports = {
  postTask: function(req, res, next) {
    const {addItem} = req.body;
    const query = `
      INSERT INTO Task(item)
      VALUES ($1);
    `
    const value = [addItem]
    db.query(query, value)
      .then((data)=>{
        console.log(data)
        res.sendStatus(200)
      })
      .catch((err)=>{
        console.log('Error with postTask', err)
        res.sendStatus(401)
      })
  },

  getTasks: function(req, res, next) {
    const query = `
      SELECT * FROM "task"
    `
    db.query(query)
      .then((data)=>{
        console.log(data.rows);
        res.locals.all = data.rows; 
        res.status(200).json(res.locals.all)
      })
      .catch((err)=>{
        console.log('Error with postTask', err)
      })
  },

  deleteTask: function(req, res, next) {
    const {id} = req.body;
    const idString = id.toString();
    const query = `
      DELETE FROM task
      WHERE id = $1;
    `
    const value = [idString]
    db.query(query, value)
      .then((data)=>{
        res.status(200)
      })
      .catch((err)=>{
        console.log('Error with postTask', err)
      })
  },


};
