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
    app.use(passport.initialize());
    app.use(passport.session());
    require('../app/routes/fakeChecker.routes.js')(app);
    require('../app/routes/user.routes.js')(app);
    return app;
};
