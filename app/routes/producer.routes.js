"use strict";
var producerController = require('../../app/controllers/producer.controller');
var ProducerCtrl = producerController.ProducerController;
module.exports = function (app) {
    app.route('/producer')
        .post(ProducerCtrl.create)
        .get(ProducerCtrl.list);
};
//# sourceMappingURL=producer.routes.js.map