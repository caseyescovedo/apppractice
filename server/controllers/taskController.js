
const db = require('../models/TaskModel.js');

const taskController = {};

taskController.postTask = (req, res, next) => {
      const { item } = req.body;
      const values = [item];
      //query the database
      db.query(`INSERT INTO tasks (item) VALUES ($1) returning *`,
        values,
      (err, post) => {
        if(err) {
          return next(err);
        }
        //send response back;
        res.locals.post = post.rows[0];
        return next();
      }
    );
  };


// taskController.getTasks = (req, res, next) => {
//     const queryText = `SELECT * FROM tasks;`;
//   db.query(queryText)
//     .then((data) => {
//       res.locals.info = data;
//       return next();
//     })
//     .catch((err) => {
//       console.log(err);
//       return next(err);
//     });
//   };

// taskController.deleteTask = (req, res, next) => {
//     const { _id } = req.body;
//   const values = [_id];
//   db.query(
//     `DELETE from tasks WHERE _id = $1 RETURNING _id;`,
//     values,
//     (err, response) => {
//       if (err) {
//         return next(err);
//       } else {
//         res.locals.deleted = response.rows[0];
//         return next();
//       }
//     }
//   );
//   }

module.exports = taskController;