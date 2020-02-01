/* eslint-disable no-console */
const taskTable = require('./TaskModel');

/**
 * creates a table 'Task' that has two columns:
 *  1) item: a required string field
 *  2) created_at: a field which becomes the time the row was submitted
 *  */
const text = `
  CREATE TABLE Task (
    id SERIAL PRIMARY KEY,
    item varchar(65535) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT(NOW())
  );`;

const values = null;

taskTable.query(text, values)
  .then((res) => {
    console.log('Table Created: ', res);
    taskTable.end();
  })
  .catch((err) => {
    console.log(err.stack);
  });
