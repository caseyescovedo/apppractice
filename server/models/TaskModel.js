const {Pool} = require('pg')

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://nfxquvlj:wepgIGcknbZ8cpCujXydfOYVmkReots4@lallah.db.elephantsql.com:5432/nfxquvlj';

const pool = new Pool({connectionString:myURI});
// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;




module.exports = {
  query:function(text,params,cb){
    return pool.query(text,params,cb)
  }
}; // <-- export your model
