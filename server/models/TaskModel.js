// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://lygonqau:PSw2yt66akbGc_PQkU4HDfapS3MNyyl1@salt.db.elephantsql.com:5432/lygonqau';
const Pool = require('pg').Pool;

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

const pool = new Pool ({
    connectionString: myURI
});

const schema = `CREATE TABLE IF NOT EXISTS tasks (
    _id serial primary key,
    item varchar NOT NULL,
    created_at timestamp
)`;

pool.query(schema, (err, result) => {
    if(err) {
        console.log('issue with table creation', err)
    } else {
        console.log('table created!', result)
    }
})














// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
 const URI = process.env.PG_URI || myURI;

module.exports = pool; // <-- export your model
