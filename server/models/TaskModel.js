// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI

// installed pg 
// will be using postgres and using elephantSQL to host my database
const myURI = 'postgres://arqsswpq:TExFYG6nMRwKLK9gf1_Uy-yUV55ttvNr@rajje.db.elephantsql.com:5432/arqsswpq';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;



const { Pool } = require('pg');
const pool = new Pool({
  connectionString: myURI,
});



// Made my tables in terminal 
// want to make a users table and a tasks table
/**
 * psql 'postgres://arqsswpq:TExFYG6nMRwKLK9gf1_Uy-yUV55ttvNr@rajje.db.elephantsql.com:5432/arqsswpq'
 * 
 * Using vim editor \e to input query strings in psql shell
 * 
 * \e 
 * 
 * CREATE TABLE Users(
 *  user__id serial PRIMARY KEY,
 *  username VARCHAR (50) UNIQUE NOT NULL,
 *  password VARCHAR (50) NOT NULL,
 * )
 * 
 * CREATE TABLE Tasks(
 * __id serial PRIMARY KEY,
 * user_id INTEGER REFERENCES Tasks (user_id) DEFAULT 1
 * item VARCHAR NOT NULL,
 * created_at TIMESTAMPZ DEFAULT NOW()
 * );
 * 
 * get my neighborhood friendly codesmith in there
 * INSERT INTO users (username, password) VALUES ('codesmith', 'ilovetesting');
 * 
 */


// exporting my model object
module.exports = {
  query: (queryString, queryValues, callback) => {
    console.log('EXECUTED', queryString);
    return pool.query(queryString, queryValues, callback);
  },
};
