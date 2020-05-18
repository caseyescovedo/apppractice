// const { Pool } = require("pg");
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  "postgres://pizedyau:C3qHPnlyUDdMryuYoqeFd1KBoSko5QL_@isilo.db.elephantsql.com:5432/pizedyau";

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

// const pool = new Pool({
//   connectionString: myURI,
// });

// module.exports = {
//   query: (text, params, callback) => {
//     console.log("executed query", text);
//     return pool.query(text, params, callback);
//   },
// }; // <-- export your model

// Not sure how to do it this way, so i formatted it the way we usually do like in the commented lines above
module.exports = URI;
