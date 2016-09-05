var users = require('../../app/controllers/userController');
module.exports = function (app) {
    app.route('/users')
        .post(users.create)
        .get(users.list);
};
