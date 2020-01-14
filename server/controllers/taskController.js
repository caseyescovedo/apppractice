const db = require('../models/TaskModel');
const task = {}; 

//middleware to create tasks
task.createTask = (req, res, next) =>{
  //receiving the item from the request (client)
  const { item } = req.body; 
  //query to insert the values received into the table 
  const text = `INSERT INTO "Task"("item", "created_at")
                VALUES ($1, ${NOW()}); 
               `
  const values = [ item ];

  db.query(text, values)
  .then(response => {
    //storing the response in the res.locals.create
    res.locals.create = response.rows[0];
    console.log(response);
    next();
  })
  .catch(err => {
    console.log(err);
  })
}

//middleware to get all task items 
task.getItems = (req, res, next) => {
  const text = `SELECT * 
                FROM "Task";`
  db.query(text)
  .then(response => {
    // console.log('repsonse in the getITems', response);
    res.locals.list = response.rows;
    next();
  })
  .catch(err => {
    console.log(err);
  })
}

//middleware to delete data
task.deleteItems = (req, res, next) =>{
  const { _id } = req.body; 
  const text = `DELETE FROM "Task" 
                WHERE _id = ${_id}; 
                `
  db.query(text)
  .then(response => {
    res.locals.delete = response.rows[0];
    next();
  })
  .catch(err => {
    console.log(err)
  })
}
 
module.exports = task;
