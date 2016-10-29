var product = require('../../app/controllers/product.controller');
module.exports = (app) => {
    app.route('/product')
        .post(product.create)
        .get(product.list);
};