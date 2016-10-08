"use strict";
var ActiveUserEntry = (function () {
    function ActiveUserEntry(user, userToken, logoutTime) {
        this.user = user;
        this.userToken = userToken;
        this.logoutTime = logoutTime;
    }
    return ActiveUserEntry;
}());
exports.ActiveUserEntry = ActiveUserEntry;
var AuthenticatedProduserUsersHelper = (function () {
    function AuthenticatedProduserUsersHelper() {
    }
    AuthenticatedProduserUsersHelper.addUser = function (user, token) {
        var timeoutMinutesLater = new Date();
        timeoutMinutesLater.setMinutes(timeoutMinutesLater.getMinutes() + AuthenticatedProduserUsersHelper.tokenTimeout);
        this.users[user.username] = new ActiveUserEntry(user, token, timeoutMinutesLater);
    };
    AuthenticatedProduserUsersHelper.removeUser = function (userName) {
        delete AuthenticatedProduserUsersHelper.users[userName];
    };
    AuthenticatedProduserUsersHelper.getUserEntry = function (userName) {
        return AuthenticatedProduserUsersHelper.users[userName];
    };
    AuthenticatedProduserUsersHelper.updateActiveTokens = function () {
        var keys = Object.keys(AuthenticatedProduserUsersHelper.users);
        var keysToRemove = [];
        var now = Date.now;
        for (var ind = 0; ind < keys.length; ind++) {
            if (AuthenticatedProduserUsersHelper.users[keys[ind]].logoutTime < now) {
                keysToRemove.push(keys[ind]);
            }
        }
        for (var ind = 0; ind < keysToRemove.length; ind++) {
            delete AuthenticatedProduserUsersHelper.users[keysToRemove[ind]];
        }
    };
    AuthenticatedProduserUsersHelper.users = Object.create(null);
    AuthenticatedProduserUsersHelper.tokenTimeout = 20;
    return AuthenticatedProduserUsersHelper;
}());
exports.AuthenticatedProduserUsersHelper = AuthenticatedProduserUsersHelper;
//# sourceMappingURL=authenticatedProduserUsersHelper.js.map