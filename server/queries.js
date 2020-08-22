const db = require("./models/TaskModel.js");

const queries = {};

// =============== ADD USER =============== //
const queryString1 = `INSERT INTO Tasks(item, created_at)
VALUES($1, $2) RETURNING item`;
const queryValues1 = ['eat', '10:00:00'];

// db.query(queryString1, queryValues1)
//   .then(data => {
//     console.log(data.rows)
//   });

// INSERT INTO Tasks(item, created_at) VALUES('eat', '10:00:00') RETURNING item



// =============== GET ALL TASKS =============== //
const queryString2 = `
SELECT * FROM Tasks
`;

// db.query(queryString2)
//   .then(data => {
//     console.log(data.rows)
//   });




// =============== DELETE USER =============== //
const queryString3 = `DELETE FROM Tasks WHERE item=$1`;
const queryValues3 = ['eat'];

// db.query(queryString3, queryValues3)
//   .then(data => {
//     console.log(data.rows)
//   });



module.exports = queries;