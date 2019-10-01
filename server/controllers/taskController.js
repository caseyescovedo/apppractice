const pool = require('../models/TaskModel');
module.exports = {
    postTask: (req, res, next)=>{
        pool.query('INSERT INTO task (item) VALUES($1) RETURNING *', [req.body.input], (err, result)=>{
            if (err) return next(err);
            console.log(result)
        })
    },
    getTasks: (req, res, next)=>{
        pool.query('SELECT * FROM task', (err, selectedAllResult)=>{
            if (err) return next(err);
            res.locals.getTasks = selectedAllResult.rows;
            return next();
        })
    },
    deleteTask: (req, res, next)=>{
        pool.query(`DELETE FROM task WHERE _id ='${req.body.id}'`, (err, result)=>{
            if(err) {
                res.locals.deleted = false;
                return next(err);
            }
            res.locals.deleted = true;
            return next();
        })
    }
};
