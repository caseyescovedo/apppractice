
function postTask(doc) {
    doc.save((err, doc) => {
    if(err) {console.log(err)};
    console.log('SAVED');    
    })
}

function getTask(doc) {
    doc.find({}, (err, doc) => {
        if(err) {console.log(err)};
        console.log("GET");
    })
}

// Pass in item value as string parameter to search
function deleteTask(string) {
    task.delete({'item': string}, (err, doc) => {
        if(err) {console.log(err)};
        console.log("DELETE");
    })
}

module.exports = {
    postTask,
    getTask, 
    deleteTask
};
