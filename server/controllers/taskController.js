const express = require("express");
const pg = require("pg");

//without these varaiables there is no client
//move the connect functionality a different controller
const URI = process.env.PG_URI;
console.log("URI", URI)
const client = new pg.Client(URI);

module.exports = {

  connect: function(req, res, next){

  },

  //works
  postTask : function(req, res, next){
    console.log(" Made it to DB ADD CONTROLLER");
    console.log(req.query) //for query strings
    console.log(req.body) //for post
    //CREATE TABLE Rake (_id serial PRIMARY KEY, item VARCHAR UNIQUE NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP )
    //INSERT INTO Rake(item) VALUES('Jack') RETURNING _id
    client.connect( (err) => {
      if (err) {
        console.error(" Error connecting to DB: ", err);
      } else {
        console.log(" connection okay. ");
        //client.query();
        client.query(`INSERT INTO Task(item) VALUES('the bucket') RETURNING _id`, (error, result) => {
          if(error => { console.log("ERROR WITHIN SAVE : ", error) } );
          
          console.log(" response from DB :", result);
          res.json({"result": result});
          client.end()
          next()
        })     
      }
      //Values will be replaced with a variable from either the query string or form body;
    });
  },

  getTasks : function(req, res, next){
    console.log(" Made it to list all tasks ");
    console.log("req.body", req.body);
    console.log("req.res: ", req.query)
    
    client.connect( (err) => {
      if (err) {
        console.error(" Error connecting to DB: ", err);
      } else {
        console.log(" connection okay. ");
        
        client.query(`SELECT * FROM "public"."task" LIMIT 100`, (error, result) => {
          if(error => { console.log("ERROR WITHIN RETREVIAL : ", error) } );
          
          console.log(" response from DB :", result);
          client.end();
          res.status(200).json(result.rows)
        })     
      }
    });
  },

  deleteTasks: function(req, res, next){
    console.log(" Made it to delete controller");
    res.status(200).json({result: "deleted"});
  }

}
