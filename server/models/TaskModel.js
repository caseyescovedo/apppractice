//COULD NOT FIGURE OUT HOW TO CONNECT FROM TASKMODEL SO DID IT DIFFERENTLY



// const pg = require('pg');


// // v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
// const myURI = 'postgres://zmldkybb:0j_GpumZeeBpHfBeflaJQgoCcEJj6XZk@salt.db.elephantsql.com:5432/zmldkybb';

// // UNCOMMENT THE LINE BELOW IF USING MONGO
// // const URI = process.env.MONGO_URI || myURI;

// // UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

// let db = pg.connect(URI, (err, db) => {
//     if (err) throw new Error(err);

//     const table = "CREATE TABLE IF NOT EXISTS tasks (item VARCHAR, created_at TIMESTAMP DEFAULT NOW())" 
//     db.query(table, function(err, result) {
//       if (err) throw err;
//       console.log("Table created");
//       db.end();
//     });
//   });


module.exports = db; // <-- export your model
