var users = require('../../app/controllers/produsorController');
module.exports = function (app) {
    app.route('/produsor')
        .post(users.create)
        .get(users.list);
};
