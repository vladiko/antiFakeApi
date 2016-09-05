var mongodbd = require('mongodb');
var assertA = require('assert');
var config = require('../../config/config.js');
var url = config.dbUrl;
module.exports = {
    check: (str, callback) => {
        var mongoClient = mongodbd.MongoClient;
        var mongoR;
        // Use connect method to connect to the server
        mongoClient.connect(url, function (err, db) {
            assertA.equal(null, err);
            console.log("Connected succesfully to server " + str);
            mongoR = db.collection('movie');
            var docsfond;
            mongoR.find({}).toArray((err, docs) => {
                assertA.equal(err, null);
                console.log("Found the following records");
                console.log(docs)
                docsfond = docs;
                db.close();                
                callback(docs);
            });
        });
    }
}