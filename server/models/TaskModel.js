const pg = require('pg')
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgresql://localhost/assessment';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

pg.connect(uri, (err, db) => {
  if (err) throw new Error(err);

  const table = `CREATE TABLE IF NOT EXISTS tasks
                (_id SERIAL PRIMARY KEY,
                 item VARCHAR,
                 created_at TIMESTAMP)`;

  db.query(table, function(err, result) {
    if (err) throw err;
    console.log("Table created");
    db.end();
  });
});

module.exports = function(item) {
  pg.connect(uri, (err, db) => {
    const query = {
      text: `INSERT INTO tasks (item, created_at)
             VALUES ($1, CURRENT_TIMESTAMP)
             RETURNING *`,
      values: item
    }

    db.query(query)
    db.end();
  });
};
