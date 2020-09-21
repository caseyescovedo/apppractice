// Schema Info: 
// We want to store our data in a collection/table called Task. (Remember, this may be created as the plural Tasks - that is fine.)
// All items in the database must have a property item which is a string
// Additionally, all items should be stored with the time they were created_at. This should default to the current time

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://uvposgon:e8QQs3eVt4_SfY_yXjF8TpNPHebFonPS@lallah.db.elephantsql.com:5432/uvposgon';

const URI = process.env.PG_URI || myURI;

const { Pool } = require('pg'); 

const pool = new Pool({connectionString: URI}); 

module.exports = {
  query: function (text, values, cb) {
    console.log(`Performed Query ${text}`);
    return pool.query(text, values, cb); 
  }
}; // <-- export your model
