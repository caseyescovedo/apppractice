const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://yziyjcmj:tr4HsR8Gt0GA_fAxwAXkih3lk_e96Wfu@rajje.db.elephantsql.com:5432/yziyjcmj';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const connectionString = URI;

const taskTable = new Pool({
  connectionString,
});

// * Task table is created in './createTaskTable.js'

module.exports = taskTable; // <-- export your model
