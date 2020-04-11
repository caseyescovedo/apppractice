const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://rsaalztr:INS0Y-TXBj5TpiS-99UMVDXxQJcnfuky@drona.db.elephantsql.com:5432/rsaalztr';

const pool = new Pool({
  connectionString: myURI
})

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

/* POSTGRESQL TABLE SCHEMA
CREATE TABLE Task (
	_id serial NOT NULL,
	item VARCHAR(255) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	CONSTRAINT Task_pk PRIMARY KEY (_id)
) WITH (
  OIDS=FALSE
);
*/


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
}; // <-- export your model
