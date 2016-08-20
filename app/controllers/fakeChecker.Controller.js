var fakeCheckerDal = require('../dal/fakeChecker.dal.ts');
exports.render = function (req, res) {
    fakeCheckerDal.check('d', function (docs) {
        var names = [];
        docs.forEach(function (d) { names.push(d.name); });
        res.send('Hello World Express Controller ' + names.join(' '));
    });
};
//var fs = require("fs");
//exports.imgList = function (req, res) {
//    var fileList = [];
//    fs.readdir("./../mean3client/resoures/styles/", function (err, files) {
//        if (err) {
//            return console.error(err);
//        }
//        files.forEach(function (file) {
//            fileList.push(files);
//        });
//        res.send(files);
//    });
//};
