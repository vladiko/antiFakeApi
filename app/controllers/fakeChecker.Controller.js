var fakeCheckerDal = require('../dal/fakeChecker.dal');
var idGenerator = require('../services/uuidGenerator');
exports.render = function (req, res) {
    var ids = [];
    for (var i = 0; i < 100000; i++) {
        ids.push(idGenerator());
    }
    var uuid = idGenerator();
    fakeCheckerDal.check('d', function (docs) {
        var names = [];
        docs.forEach(function (d) { names.push(d.name); });
        //var idStrins = ids.join('</br>');
        res.send(ids.length + ' Hello World Express Controller: ' + names.join(', '));
    });
};
