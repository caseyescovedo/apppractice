const { Pool } = require("pg");
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://jeuvwvap:OF-SnjKfvu2XuI4MpeJtTJ7Xn0gCVtb_@isilo.db.elephantsql.com:5432/jeuvwvap';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

//the db was not picking up when i simply uncommented the the line above so i reverted to what previously worked 
const pool = new Pool({
  connectionString: myURI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
}; // <-- export your model
