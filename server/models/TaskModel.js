// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const {Pool} = require('pg');

const pool = new Pool ({
  connectionString : 'postgres://kaxqitrs:PxeSy866ElmP4liT-plCSdHowAhT31Zw@rajje.db.elephantsql.com:5432/kaxqitrs'
})
// const myURI = '';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;




module.exports = {
  query: (text, values, callback) => {
    console.log('Executed query: ', text);
    return pool.query(text, values, callback)
  }
} ; // <-- export your model
