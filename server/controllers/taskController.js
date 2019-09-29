const { Pool } = require('pg');

const myURI = 'postgres://zmldkybb:0j_GpumZeeBpHfBeflaJQgoCcEJj6XZk@salt.db.elephantsql.com:5432/zmldkybb';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI
});

const taskController = {};

taskController.postTask = (req, res, next) => {
    pool.query('INSERT INTO tasks (item) VALUES ($1)', [req.body.item], (err, results) => {
        if (err) throw err; 
        return next();
    })
}

taskController.getTasks = (req, res, next) => {
    pool.query('SELECT item FROM tasks', (err, results) => {
        if (err) throw err;
        res.locals.results = results.rows
        next();
    })
}

taskController.deleteTask = (req, res, next) => {
   pool.query ('DELETE from tasks WHERE item = $1', [req.body.item], (err, results) => {
       if (err) throw err;
       res.locals.results = results.rows
       return next();
   })
}

module.exports = taskController;
