"use strict";
var ActiveUserEntry = (function () {
    function ActiveUserEntry(user, userToken) {
        this.user = user;
    }
    return ActiveUserEntry;
}());
exports.ActiveUserEntry = ActiveUserEntry;
var AuthenticatedProduserUsersHelper = (function () {
    function AuthenticatedProduserUsersHelper() {
    }
    AuthenticatedProduserUsersHelper.addUser = function (user, token) {
        this.users[user.username] = new ActiveUserEntry(user, token);
    };
    AuthenticatedProduserUsersHelper.removeUser = function (userName) {
        delete users[userName];
    };
    AuthenticatedProduserUsersHelper.getUserEntry = function (userName) {
        return users[userName];
    };
    AuthenticatedProduserUsersHelper.users = Object.create(null);
    return AuthenticatedProduserUsersHelper;
}());
exports.AuthenticatedProduserUsersHelper = AuthenticatedProduserUsersHelper;
//# sourceMappingURL=authenticatedProduserUsersHelper.js.map