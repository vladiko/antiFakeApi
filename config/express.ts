import express = require('express');
import morgan = require('morgan');
import compress = require('compression');
import bodyParser = require('body-parser');
import session = require('express-session');
import * as passport from 'passport';

var config = require('./config'),
    methodOverride = require('method-override');
module.exports = function () {
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

    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/producer.routes.js')(app);
    require('../app/routes/product.routes.js')(app);
    require('../app/routes/itemKey.routes.js')(app);
    require('../app/routes/fakeChecker.routes.js')(app);
    require('../app/routes/user.routes.js')(app);
    app.use(express.static('./public'));
    return app;
};