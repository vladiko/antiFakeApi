/// <reference path="../../../_clientRefernces.ts" />
var antiFakeClient;
(function (antiFakeClient) {
    'use strict';
    var app = angular.module('client');
    var LoginCtr = (function () {
        function LoginCtr() {
            this.controller = LoginCtrViewModel;
            this.templateUrl = 'src/components/loginCtr.html';
            this.controllerAs = 'vm';
        }
        return LoginCtr;
    }());
    var LoginCtrViewModel = (function () {
        function LoginCtrViewModel(_communictionService) {
            var _this = this;
            this._communictionService = _communictionService;
            this.login = function (username, password) {
                _this._communictionService.login(username, password).then(null, function (err) {
                    _this.errorMessage = err;
                });
            };
        }
        Object.defineProperty(LoginCtrViewModel.prototype, "isAuthenticated", {
            get: function () {
                return !!antiFakeClient.CurrentUser.userToken;
            },
            enumerable: true,
            configurable: true
        });
        LoginCtrViewModel.$inject = ['communicationService'];
        return LoginCtrViewModel;
    }());
    app.component('loginCtr', new LoginCtr());
})(antiFakeClient || (antiFakeClient = {}));
//# sourceMappingURL=loginCtr.js.map