"use strict";
var http = require('http');
var port = process.env.port || 1337;
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
// Connection URL
var url = 'mongodb://test:test@koganx.cloudapp.net:27017/test';
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    var mongoR;
    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected succesfully to server");
        mongoR = db.collection('movie');
        var docsfond;
        mongoR.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            docsfond = docs;
            db.close();
            res.end('Hello World\n  ' + docsfond + '\n');
            //callback(docs);
        });
    });
}).listen(port);
//# sourceMappingURL=server.js.map