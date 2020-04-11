// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'postgres://twspqvev:evZP2CqZYXwigL3RHlwxSE-mJZydNYZO@drona.db.elephantsql.com:5432/twspqvev';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

module.exports = myURI; // <-- export your model
