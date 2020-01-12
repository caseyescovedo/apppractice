// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://gefnfxci:vDVAsIU2vAf7sYvvQ6pH0_lCSO3dBMqP@rajje.db.elephantsql.com:5432/gefnfxci';
const { Pool } = require('pg');

//some SQL code for reference
// CREATE TABLE "Task" (
// 	"_tid" serial NOT NULL,
// 	"item" varchar(255) NOT NULL,
// 	"created_at" TIMESTAMP NOT NULL,
// 	CONSTRAINT "Task_pk" PRIMARY KEY ("_tid")
// ) WITH (
//   OIDS=FALSE
// );



// UNCOMMENT THE LINE BELOW IF USING MONGO

// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI; //i think this fires up a databse locally if one is not found online right?

//create the pool
const pool = new Pool({
  connectionString: URI
});

module.exports = {
  query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
  }
};; // <-- export your model
