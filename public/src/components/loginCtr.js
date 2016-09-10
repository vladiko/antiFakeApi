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
        function LoginCtrViewModel() {
            this.t = 'dddd';
            this.t = 'dd';
        }
        return LoginCtrViewModel;
    }());
    app.component('loginCtr', new LoginCtr());
})(antiFakeClient || (antiFakeClient = {}));
