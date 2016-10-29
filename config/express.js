"use strict";
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var config = require('./config'), methodOverride = require('method-override');
module.exports = function () {
    var app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
        console.log('development');
    }
    else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        next();
    });
    app.use(passport.initialize());
    app.use(passport.session());
    var router = express.Router();
    require('../app/routes/producer.routes.js')(app, router);
    require('../app/routes/product.routes.js')(app, router);
    require('../app/routes/itemKey.routes.js')(app, router);
    require('../app/routes/fakeChecker.routes.js')(app, router);
    require('../app/routes/user.routes.js')(app, router);
    app.use(express.static('./public'));
    var errorHandler = function (err, req, res, next) {
        console.error(err);
        res.status(500).send('Something broke!');
    };
    app.use(errorHandler);
    return app;
};
//# sourceMappingURL=express.js.map