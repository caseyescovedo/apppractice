const { Pool } = require("pg");
const myURI =
  "postgres://kdxbbyck:a46pCP8LF6SXhl-FskgyR0lfNYWrwDvp@rajje.db.elephantsql.com:5432/kdxbbyck";

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI
});

pool.query(userTable, err => {
  if (err) console.log("error from userTable", err);
});

pool.query(createTable, err => {
  if (err) {
    console.log("error from createTable", err);
  }
});

//stored by the created time
const createTable =
  "CREATE TABLE IF NOT EXISTS ToDo(id SERIAL PRIMARY KEY, Task VARCHAR NOT NULL, item VARCHAR NOT NULL)";

const userTable =
  "CREATE TABLE IF NOT EXISTS NewUser(id SERIAL PRIMARY KEY, UserName VARCHAR NOT NULL, PassWord VARCHAR NOT NULL)";

module.exports = {
  query: (text, params, callback) => {
    console.log("from modeule export", query.text);
    return Pool.query(text, params, callback);
  }
};
