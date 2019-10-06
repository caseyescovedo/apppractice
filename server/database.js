const Pool = require("pg").Pool;
let url = 'postgres://tkwyqcpg:6vGhJwOIekQSEPFlDDoLMJ-FoRE6rU2z@salt.db.elephantsql.com:5432/tkwyqcpg';
const pool = new Pool({
    connectionString: url
});
module.exports = pool;