const { Pool } = require('pg');
const myURI = require('./models/TaskModel');

const pool = new Pool({
  connectionString: myURI
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
