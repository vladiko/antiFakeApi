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
(function (UserAuthorizationRoles) {
    UserAuthorizationRoles[UserAuthorizationRoles["SUPER_USER"] = 100] = "SUPER_USER";
    UserAuthorizationRoles[UserAuthorizationRoles["USERS_ADMIN"] = 90] = "USERS_ADMIN";
    UserAuthorizationRoles[UserAuthorizationRoles["PRODUCERS_ADMIN"] = 80] = "PRODUCERS_ADMIN";
    UserAuthorizationRoles[UserAuthorizationRoles["PRODUCERS_KEY_CREATOR"] = 70] = "PRODUCERS_KEY_CREATOR";
})(exports.UserAuthorizationRoles || (exports.UserAuthorizationRoles = {}));
var UserAuthorizationRoles = exports.UserAuthorizationRoles;
var AuthUsersHelper = (function () {
    function AuthUsersHelper(timeout, checkingInterval) {
        var _this = this;
        this.tokenTimeout = 20;
        this.checkInterval = 60000;
        if (timeout) {
            this.tokenTimeout = timeout;
        }
        if (checkingInterval) {
            this.checkInterval = checkingInterval;
        }
        this.users = Object.create(null);
        setInterval(function () {
            _this.updateActiveTokens();
        }, this.checkInterval);
    }
    AuthUsersHelper.prototype.getUserTimeoutTime = function () {
        var timeoutMinutesLater = new Date();
        timeoutMinutesLater.setMinutes(timeoutMinutesLater.getMinutes() + this.tokenTimeout);
        return timeoutMinutesLater;
    };
    AuthUsersHelper.prototype.addUser = function (user, token) {
        this.users[user.username] = new ActiveUserEntry(user, token, this.getUserTimeoutTime());
    };
    AuthUsersHelper.prototype.removeUser = function (userName) {
        delete this.users[userName];
    };
    AuthUsersHelper.prototype.getUserEntry = function (userName, updateTimeout) {
        if (updateTimeout === void 0) { updateTimeout = true; }
        var retEntry = this.users[userName];
        if (retEntry && updateTimeout) {
            retEntry.logoutTime = this.getUserTimeoutTime();
        }
        return retEntry;
    };
    AuthUsersHelper.prototype.updateActiveTokens = function () {
        var keys = Object.keys(this.users);
        var keysToRemove = [];
        var now = Date.now();
        for (var ind = 0; ind < keys.length; ind++) {
            if (this.users[keys[ind]].logoutTime.getTime() < now) {
                keysToRemove.push(keys[ind]);
            }
        }
        for (var ind = 0; ind < keysToRemove.length; ind++) {
            delete this.users[keysToRemove[ind]];
        }
    };
    return AuthUsersHelper;
}());
exports.AuthUsersHelper = AuthUsersHelper;
//# sourceMappingURL=authUsersHelper.js.map