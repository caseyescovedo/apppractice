/*
#### Task Model
In the `server/models/TaskModel.js` file, implement a database in either MongoDB or PostgresQL (Mongoose/Sequelize optional) as described below:
- [ ] We want to store our data in a collection/table called `Task`. (Remember, this may be created as the plural `Tasks` - that is fine.)
- [ ] All items in the database must have a property `item` which is a string
- [ ] Additionally, all items should be stored with the time they were `created_at`. This should default to the current time
*/

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://rhnqvzvg:AH-3ZbN33Em_zE4KuMKDea_AHkTOstt5@salt.db.elephantsql.com:5432/rhnqvzvg';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: URI
});

/* My database was initially setup to have a data type of timestamp and a default value of now().  However, I changed the data type to varchar and removed the default while attempting determine why my queries were return errors.  I didn't have to time to fix my changes.  */




module.exports = pool; // <-- export your model
