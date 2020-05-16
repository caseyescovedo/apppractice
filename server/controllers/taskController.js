const db = require("../models/TaskModel.js");

module.exports = {
  getTodo: async (req, res, next) => {
    const query = {
      text: "SELECT * FROM todo",
    };
    try {
      const results = await db.query(query);
      res.status(200).json(results.rows);
    } catch (err) {
      next({ log: `we messed up get todo ${err}`, status: 500 });
    }
  },

  addItem: async (req, res, next) => {
    console.log("REQ.BODY: ", req.body);
    const { item } = req.body;
    const query = {
      text: "INSERT INTO Task (item values ($1) returning *",
      values: [item],
    };
    try {
      const newItem = await db.query(query);
      res.status(200).json(newItem.rows[0]);
    } catch (err) {
      next({
        log: `errors in post ${err}`,
        status: 500,
        message: "idk boss we couldnt post",
      });
    }
  },

  deleteItem: async (req, res, next) => {
    console.log("req.body: ", req.body);
    const { id } = req.body;
    const query = {
      text: "DELETE FROM Task where id=$1",
      values: [id],
    };
    try {
      await db.query(query);
      res.sendStatus(200);
    } catch (err) {
      next({
        log: `errorstuff in delete ${err}`,
        status: 500,
        message: "idk boss we couldnt delete",
      });
    }
  },
};
