// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require('pg');
const myURI = 'postgres://xkizvfjp:YgAeG8uHXsydb5j9UklxmdxipSUTcU1L@rajje.db.elephantsql.com:5432/xkizvfjp';
const pool = new Pool;
// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQLpostgres://xkizvfjp:YgAeG8uHXsydb5j9UklxmdxipSUTcU1L@rajje.db.elephantsql.com:5432/xkizvfjp
const URI = process.env.PG_URI || myURI;


//All database calls through postman fail, usually with error that my Ubuntu user account failed password authentication.  
//Last had this error when I was trying to access a remote database with PGAdmin open locally, not open now.  Not sure what's happening.  

// module.exports = {query: (text, params, callback) => {
//     return pool.query(text, params, (err, res) => {
//       console.log('executed query', text)
//       callback(err, res)
//     })
//   }
// }; // <-- export your model

module.exports = {
    query: (text,params,callback) => {
        return pool.query(text, params, (err, result) => {
                    if (err) {
                    return console.error('Error executing query', err.stack)
                    }
                    // console.log(result.rows);
        })
    }
}