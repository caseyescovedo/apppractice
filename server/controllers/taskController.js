const db = require('../models/TaskModel.js');
const taskController = {};


  //some SQL code for reference
// CREATE TABLE "Task" (
// 	"_tid" serial NOT NULL,
// 	"item" varchar(255) NOT NULL,
// 	"created_at" TIMESTAMP NOT NULL,
// 	CONSTRAINT "Task_pk" PRIMARY KEY ("_tid")
// ) WITH (
//   OIDS=FALSE
// );

// INSERT INTO "Task" (item, created_at)
//       values('get groceries', current_timestamp) //tested with elephant query (gotta love that site)



taskController.getTasks =(req, res, next) => {
  sqlQuery = `SELECT * FROM "Task"`
  db.query(sqlQuery) //grabbing all entries with a SELECT * of the table
  .then(response => {
    console.log(response.rows);
    res.locals.tasks = response.rows; //save it to res.locals.task
    next();
    })
  .catch(err => next(err)) //if err, return this to the error handler
}
 

taskController.postTask = (req, res, next) => {
  const  { task } = req.body;
  console.log(task); //checking data from the front end
  const values = [task]; //add it to values

  sqlQuery = `INSERT INTO "Task" (item, created_at)
      values($1, current_timestamp)
      RETURNING *`

  db.query(sqlQuery, values) //insert into returning all rows, I want to see a console log on the server
  .then(response => {
    console.log(response.rows[response.rows.length-1]);
    res.locals.oneTask = response.rows[response.rows.length-1]//this will be our entry we posted, just to check things
    next();
    })
  .catch(err => next(err)) //if err, return this to the error handler
}


taskController.deleteTask = (req, res, next) => {
  const  { _tid } = req.body;
  console.log(_tid); //checking data from the front end

  sqlQuery = `DELETE FROM "Task"
  WHERE _tid=${_tid}`;

  db.query(sqlQuery) //delete row at that particular ID
  .then(response => {
    console.log("task deleted");  //console log to announce things
    next();
    })
  .catch(err => next(err)) //if err, return this to the error handler
}
module.exports = taskController;
