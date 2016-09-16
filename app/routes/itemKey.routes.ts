var product = require('../../app/controllers/itemKey.controller');
module.exports = function (app) {
    app.route('/itemKey')
        .post(product.create)
        .get(product.list);
};