const { Sequelize, DataTypes } = require('sequelize');
const { dbURI } = require('../../env.js');

// DB URI
const myURI = dbURI;

// Codesmith environment selector
const URI = process.env.PG_URI || myURI;

// Create instance of Sequelize, connecting the DB
const sequelize = new Sequelize(URI);

// Create Task model
const Task = sequelize.define('task', {
  item: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  createdAt: 'created_at',
});

// Sync the DB to the models (Use {force: true} to recreate DB or
// {alter: true} to update the tables)
// sequelize.sync({force: true})
//   .then(() => console.log("DB synced"));

module.exports = Task; // <-- export your model
