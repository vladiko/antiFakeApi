var producer = require('../../app/controllers/producer.controller');
module.exports = function (app) {
    app.route('/producer')
        .post(producer.create)
        .get(producer.list);
};
