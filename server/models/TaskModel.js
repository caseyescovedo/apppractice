// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://rosofloc:	ZxmZbxuQgcP5JLL055PZylG_2m3LA05m@ruby.db.elephantsql.com:5432/rosofloc';



// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;
//I spent 1.5 Hours trying to connect my Beaver/DB GUI to elephantsql.

module.exports = null; // <-- export your model
