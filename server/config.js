require('dotenv').config()

const { Pool } = require('pg')

const connectionString = `postgres://ubvrbezj:ihrk80uWbgazBAQkQQc2qlo1yBs2WUTa@salt.db.elephantsql.com:5432/ubvrbezj`

const pool = new Pool({
  connectionString: connectionString,
  // ssl: 'developement',
})

module.exports = { pool }