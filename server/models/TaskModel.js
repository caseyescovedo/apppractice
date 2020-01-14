const { Pool } = require('pg');

const myURI = 'postgres://tubhthgl:iSUqYiSrmeQbPEB5zr0PEEcMFFVTGOqM@rajje.db.elephantsql.com:5432/tubhthgl';

const URI = process.env.PG_URI || myURI;

const pool = new Pool({
    connectionString: URI
});


module.exports = { 
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }
};


