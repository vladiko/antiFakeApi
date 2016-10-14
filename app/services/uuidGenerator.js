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
//# sourceMappingURL=uuidGenerator.js.map