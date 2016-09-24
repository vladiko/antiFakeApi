'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./config/mongoose');
var db = mongoose();
var express = require('./config/express');
var passport = require('./config/passport');
var passport = passport();
var port = process.env.PORT || 1337;
var app = express();
app.listen(port);
module.exports = app;
//# sourceMappingURL=server.js.map