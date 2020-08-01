// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require('pg');

const myURI = '	postgres://hugvxygo:HMvk33BphSRAV4MEG0lTL2LTNNg-cHK8@ruby.db.elephantsql.com:5432/hugvxygo';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const pool = new Pool({
	connectionString: myURI
})


module.exports = {
	query: (text, params, cb) => {
		console.log(`Executed query ${text}`);
		return pool.query(text, params, cb);
	}
}
