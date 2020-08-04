const { Pool } = require('pg');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://etrerkna:3ywO8jnw6pY4ePBlQpnXDyGSau39eHM-@ruby.db.elephantsql.com:5432/etrerkna';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;






/* psql -d <url from elephantSQL> -f <yourSQLFile.sql> */
// CREATE TABLE "Tasks" (
//     "_id" serial NOT NULL,
//     "item" TEXT NOT NULL,
//     "created_at" TIMESTAMP default NOW(),
//     CONSTRAINT "Tasks_pk" PRIMARY KEY ("_id")
// ) WITH (
//     OIDS=FALSE
// );




const pool = new Pool({
    connectionString: myURI
});



module.exports = {
    query: (text, params, cb) => {
        console.log("Executed query: ", text);
        return pool.query(text, params, cb);
    }
}; // <-- export your model
