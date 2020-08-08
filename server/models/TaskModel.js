// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const {Pool} = require('pg')
const myURI = 'postgres://yvuqerts:YKBJ1z1JsA3or2tfdn36C9TQBi3LMTrs@rajje.db.elephantsql.com:5432/yvuqerts';

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool ({
    connectionString: myURI
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text,params,callback)
    }
};