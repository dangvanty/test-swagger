const express = require('express')
const  bodyParser = require("body-parser"),
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");
const {options} = require('./config.swagger')
const app = express()
const PORT = 3000
app.use(bodyParser.json())

const fs = require("fs");

app.get('/users', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

const user = {
  "user4" : {
     "name" : "mohit",
     "password" : "password4",
     "profession" : "teacher",
     "id": 4
  }
}

app.post('/users', function (req, res) {
  // First read existing users.
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
     data = JSON.parse( data );
     data["user4"] = req.body;
     console.log( data );
     res.end( JSON.stringify(data));
  });
})

app.get('/users/:id', function (req, res) {
  // First read existing users.
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
     var users = JSON.parse( data );
     var user = users["user" + req.params.id] 
     console.log( user );
     res.end( JSON.stringify(user));
  });
})

app.put('/users/:id', function (req, res) {
  // First read existing users.
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
     var users = JSON.parse( data );
     user[`user${req.params.id}`] = req.body;
     console.log( data );
     res.end( JSON.stringify(user));
  });
})

app.delete('/users/:id', function (req, res) {
  // First read existing users.
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
     data = JSON.parse( data );
     
     delete data["user" + req.params.id];
      
     console.log( data );
     res.end( JSON.stringify(data));
  });
})


const specs = swaggerJsdoc(options)
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(
    specs, 
    { explorer: true,
    },)
);


app.listen(PORT,()=>{
  console.log(`server is running is http://localhost:${PORT}`)
})