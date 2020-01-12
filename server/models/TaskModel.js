const { Pool } = require('pg');

const myURI = 'postgres://gvcxcova:ucY34AqX6YXjK7iKDHC5jyUjQOY2UYgL@rajje.db.elephantsql.com:5432/gvcxcova';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
    connectionString: myURI
});

module.exports = { 
    query: (text, params, callback) => {
        console.log('executed query: ', text);
        return pool.query(text, params, callback);
    }
};



