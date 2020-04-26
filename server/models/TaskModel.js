const mongodb = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//mongodb wasn't working how I expected so I bailed after an hour of frustration and will try SQL
// const { Pool } = require('pg')



// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = `mongodb+srv://dbuser:HDdRzIozYXjF6sbQ@toodoo-zyitw.mongodb.net/test?retryWrites=true&w=majority`;
// const myURI = `postgres://inesphxg:j3S9Y0fEmTOWAVvmGYZnjU5IAFS5ZcCT@drona.db.elephantsql.com:5432/inesphxg`
// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// mongoose.connect(myURI, {
    // useNewUrlParser: true
// })

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const taskSchema = new Schema({
    userId: Number,
    username: String,
    password: String,
    todo: {
        item: String,
        status: Boolean,
        created_at: Date
    }
})

//well sql isnt working either so I guess I have no idea what Im doing
const task = mongoose.model('task', taskSchema)
// const db = new Pool({
//     connectionString = URI;
// })

module.exports = task; // <-- export your model
