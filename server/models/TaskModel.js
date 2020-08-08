const {Pool} = require('pg')
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '	postgres://aihxrccc:ehJQ5KMf1NxtvFMdm-t9ZilB64xjnVsw@rajje.db.elephantsql.com:5432/aihxrccc';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const db = new Pool({
    connectionString: URI
  });



module.exports = {
    query:(command)=>{
        return db.query(command)
    }}; // <-- export your model
