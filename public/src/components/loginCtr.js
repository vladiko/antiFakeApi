/// <reference path="../../../_clientRefernces.ts" />
var antiFakeClient;
(function (antiFakeClient) {
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
            this.t = 'dddd';
            this.click = function () {
                _this._communictionService.addUser();
            };
        }
        LoginCtrViewModel.$inject = ['communicationService'];
        return LoginCtrViewModel;
    }());
    app.component('loginCtr', new LoginCtr());
})(antiFakeClient || (antiFakeClient = {}));
//# sourceMappingURL=loginCtr.js.map