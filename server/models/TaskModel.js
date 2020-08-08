const {Pool} = require('pg')

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://umnuvepr:MAsYKIW2qfYY03_FWzSn4qdlOZ9ZEITn@raja.db.elephantsql.com:5432/umnuvepr';

const pool = new Pool({connectionString: myURI});


// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;





module.exports={
    query: (query, params, cb)=>{
     console.log(`this is a query ${query}`)
     return pool.query(query,params,cb);
    }
}
