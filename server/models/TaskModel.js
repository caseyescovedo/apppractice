const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://maximus:gladiator>@cluster0-li7pn.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

// establing mongoose connection to mongodb atlas
mongoose.connect(myURI);
mongoose.connection.once("open", () => {
    console.log("Connected with MongoDB")
})

//schemas for Mongoose
const todoSchema = new Schema({
    id: String,
    item: String,
    created: Date
})

module.exports = function(data) {
    const Task = mongoose.model('Task', todoSchema);

    let todoData = [];

    for (let key in data) {
        for (let i = 0; i < data[key].length;i++) {
            const todoObj = {
                id: data[key][i].id,
                item: data[key][i].item,
                created: new Date(data[key][i].created)
            }
            todoData.push(todoObj)
        }
    }

    Task.insertMany(todoData, function(err, res) {
        if(err) throw err;
        mongoose.connection.close();
    })
}; // <-- export your model






