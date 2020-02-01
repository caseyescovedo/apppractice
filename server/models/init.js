// Run this script once to initialize tables

const db = require('./TaskModel');

const createTasksTable = `
  CREATE TABLE Tasks (
    id serial PRIMARY KEY,
    item VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  )
`;

db.query(createTasksTable, [], (err, res) => {
  if (err) console.log(err);
  return undefined;
});
