var users = require('../../../controllers/userController');
module.exports = function (app) {
    app.route('/users').post(users.create);
};
