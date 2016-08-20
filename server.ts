'use strict';
import http = require('http');
import mongodb = require('mongodb');
import assert = require('assert');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var port = process.env.PORT || 1337;
var app = express();
app.listen(port);
module.exports = app;


//var mongoClient = mongodb.MongoClient;
//// Connection URL
//var url = 'mongodb://test:test@koganx.cloudapp.net:27017/test';

//http.createServer(function (req, res: http.ServerResponse) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    var mongoR: mongodb.Collection;
//    // Use connect method to connect to the server
//    mongoClient.connect(url, function (err, db) {
//        assert.equal(null, err);
//        console.log("Connected succesfully to server");
//        mongoR = db.collection('movie');
//        var docsfond;
//        mongoR.find({}).toArray((err, docs) => {
//            assert.equal(err, null);
//            console.log("Found the following records");
//            console.log(docs)
//            docsfond = docs;
//            db.close();
//            res.end('Hello World\n  ' + docsfond + '\n');
//            //callback(docs);
//        });

//    });

//}).listen(port);
