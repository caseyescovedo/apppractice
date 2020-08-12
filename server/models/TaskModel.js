//[2:40pm] I copied this to here from my last assessment
//		then probably there will be more time to complete
//		more parts of the assessment this time.
const fs = require("fs");
const path = require( "path" );
const {Pool} = require("pg");
// will give the url to the Codesmith staff:
const app_cfg = JSON.parse( fs.readFileSync(
    path.join(__dirname, "..", "..", "app_cfg.json"),
    {encoding: "utf-8"}
) );

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = app_cfg.pg_url;
const pool0 = new Pool( {connectionString: app_cfg.pg_url} );

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

// test connection:
pool0.query( "SELECT NOW()" ).then( res => {
    console.log("TEST CONNECTION", res.rows[0]);
//  pool0.end();
} );

// note - alternative - to use an ORM instead in model
//      instead of direct sql queries
//      but in this exercise, will simply export the
//      sql query function

module.exports.query = (query, opt) =>
    pool0.query( query, opt );
// <-- export your model
