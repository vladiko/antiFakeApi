var fakeCheckerDal = require('../dal/fakeChecker.dal.js');
exports.render = function (req, res) {
    fakeCheckerDal.check('d', function (docs) {
        var names = [];
        docs.forEach(function (d) { names.push(d.name); });
        res.send('Hello World Express Controller: ' + names.join(', '));
    });
};
