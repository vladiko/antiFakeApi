"use strict";
var uuid = require('node-uuid');
var UuidGenerator = (function () {
    function UuidGenerator() {
    }
    UuidGenerator.generateId = function () {
        return uuid.v4();
    };
    return UuidGenerator;
}());
exports.UuidGenerator = UuidGenerator;
//}
//var gen = UuidGenerator.generateId;
//module.exports = gen; 
//# sourceMappingURL=uuidGenerator.js.map