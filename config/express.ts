﻿import express = require('express');
import morgan = require('morgan');
import compress = require('compression');
import bodyParser = require('body-parser');
import session = require('express-session');
import * as passport from 'passport';

var config = require('./config'),
    methodOverride = require('method-override');
module.exports = () => {
    var app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
        console.log('development');
    } else if (process.env.NODE_ENV === 'production') {
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
    app.use((req, res, next) => {
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
    var errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
        console.error(err);
        res.status(500).send('Something broke!');
    };
    app.use(errorHandler);

    return app;
};