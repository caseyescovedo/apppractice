const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://waynewilcox:FireMuji454@cluster0.iws60.mongodb.net/Cluster0?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
 const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose.connect(URI);

const taskSchema = new Schema ({
    item : {
        type: String , 
        required: true
    } , 
    
    created_at : {
        type: Date , 
        default: Date.now
    }

});




module.exports = mongoose.model('Task' . taskSchema); // <-- export your model

// I have an error that I'm researching, but I want to finish the test. 
// a little sucky because I can't get my schema to load properly. here is the error I got:
/* 
MissingSchemaError: Schema hasn't been registered for model "undefined".
Use mongoose.model(name, schema)
    at Mongoose.model (/Users/waynealanwilcox/Desktop/Codesmith/app-assessment-mod-0/node_modules/mongoose/lib/index.js:504:13)
    at Object.<anonymous> (/Users/waynealanwilcox/Desktop/Codesmith/app-assessment-mod-0/server/models/TaskModel.js:32:27)

*/
//, and  at this point I'm up to authorization and I can't load the app in the browser. 

