const pg = require('pg');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgresql://localhost/assessment';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

pg.connect(URI, (err, db) => {
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

module.exports = {
  sendToDatabase: async (statement) => {
    let taskId;

    await pg.connect(URI, async (err, db) => {
      await db.query(statement, (err, result) => {
        taskId = result.rows[0]._id;
        db.end();
      });
    });
    // return task id to populate list on front end
    return taskId;
  }
};
