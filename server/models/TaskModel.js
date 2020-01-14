// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://viinento:qgyhi2AHrt6GRIgkKSlVj0xkwudHor2g@rajje.db.elephantsql.com:5432/viinento';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;




module.exports = URI; // <-- export your model
