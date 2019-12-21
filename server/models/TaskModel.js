// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const mongoose = require('mongoose');
const myURI = 'mongodb+srv://choies921003:rkfaorl0953@cluster0-vgaw2.mongodb.net/test?retryWrites=true&w=majority';

const URI = process.env.MONGO_URI || myURI;
const Schema = mongoose.Schema;

mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('mongoose is connected'))
    .catch((err) => console.log(err))

mongoose.set('useFindAndModify', false)

const taskModel = new Schema({
    item: { type: String, required: true },
    created_at: { type: Date, default: Date.now() }
})

const Task = mongoose.model('task', taskModel)

module.exports = Task; // <-- export your model
