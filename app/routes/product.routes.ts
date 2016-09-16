var product = require('../../app/controllers/product.controller');
module.exports = function (app) {
    app.route('/product')
        .post(product.create)
        .get(product.list);
};