/*
and perform the necessary callback operations.):
- [ ] Function `postTask` should create a new item in the database
- [ ] Function `getTasks` should retrieve all items from the database and send it back to the client as JSON
- [ ] Function `deleteTask` should find items in the database based on an ID number and delete that item if it exists
*/
module.exports = {
    postTask: function(req, res, next){
        res.locals.pool.query('INSERT INTO Tasks (item) VALUES ($1) RETURNING id, item', [req.body.item])
            .then( (result) => {res.status(200); res.json(result.rows[0])})
            .catch( (err) => {console.log(err);next(err)});
    },
    getTasks: function(req, res, next){
        res.locals.pool.query('SELECT * FROM Tasks;')
            .then(tasks => {
                //console.log(tasks);
                res.json(tasks.rows);
            })
            .catch(err => next(err));
    },
    deleteTask: function(req,res, next){
        res.locals.pool.query('DELETE FROM Tasks WHERE id=$1;',[req.body.id])
            .then(() => res.sendStatus(200))
            .catch(err => next(err));
    }
};
