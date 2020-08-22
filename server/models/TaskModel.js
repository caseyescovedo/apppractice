// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://vyyzxibf:h4h6QOkefVgLk8zC2dOMIuOJVSP0_VSQ@lallah.db.elephantsql.com:5432/vyyzxibf';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;
const express = require ('express');
const { Pool } = require('pg');
const URI = myURI;

const pool = new Pool({
    connectionString: URI,
  });


module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    },
  };
