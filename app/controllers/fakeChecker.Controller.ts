let fakeCheckerDal = require('../dal/fakeChecker.dal');
let idGenerator = require('../services/uuidGenerator');
exports.render = function (req, res) {
    var ids = [];
    for (var i = 0; i < 100000; i++) {
        ids.push(idGenerator());
    }
    var uuid = idGenerator(); fakeCheckerDal.check('d', (docs: Array<Object>) => {
        var names = [];
        docs.forEach((d: any) => { names.push(d.name); });
        //var idStrins = ids.join('</br>');
        res.send(ids.length + ' Hello World Express Controller: ' + names.join(', '));
    });
};

