const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const routes = require('./app/routes');
const port = 8000;
const db = require('./config/db');

app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port, () => {
    console.log('We are live on port ' + port);
});

MongoClient.connect(db.url,(err,database) => {
    if(err){
        console.log('Hollo');
        return console.log(err);
    }else{
        console.log('Hello');
    }
   database = database.db("note-api");
   routes(app,database);
});

