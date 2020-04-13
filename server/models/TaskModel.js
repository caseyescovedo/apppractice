const { Pool } = require('pg');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '	postgres://mdneoqik:Xs_gCrGc-KvlRMUaf1of2sNmQ_VD7GB-@drona.db.elephantsql.com:5432/mdneoqik';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

//create pool using connection string
const pool = new Pool({
	connectionString: myURI,
});

//export object that contains query property
//required in controllers to be access point to databse
module.exports = {
	query: (text, params, callback) => {
		console.log('executed query', text);
		return pool.query(text, params, callback);
	},
}; // <-- export your model
