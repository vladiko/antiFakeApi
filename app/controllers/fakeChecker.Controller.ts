var fakeCheckerDal = require('../dal/fakeChecker.dal.js');
exports.render = function (req, res) {
    fakeCheckerDal.check('d', (docs: Array<Object>) => {
        var names = [];
        docs.forEach((d: any) => { names.push(d.name); });
        res.send('Hello World Express Controller: ' + names.join(', '));
    });
};

