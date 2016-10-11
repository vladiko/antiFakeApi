/// <reference path="../../../../_clientRefernces.ts" />
var antiFakeClient;
(function (antiFakeClient) {
    'use strict';
    var app = angular.module('client');
    var Shell = (function () {
        function Shell() {
            this.controller = ShellViewModel;
            this.templateUrl = 'src/components/shell/shell.html';
            this.controllerAs = 'vm';
        }
        return Shell;
    }());
    var Domains;
    (function (Domains) {
        Domains[Domains["Users"] = 0] = "Users";
        Domains[Domains["Producers"] = 1] = "Producers";
    })(Domains || (Domains = {}));
    var ShellViewModel = (function () {
        function ShellViewModel() {
            var _this = this;
            this.Domains = Domains;
            this.selectedView = Domains.Users;
            this.select = function (view) {
                _this.selectedView = view;
            };
        }
        Object.defineProperty(ShellViewModel.prototype, "isAuthenticated", {
            get: function () {
                return !!antiFakeClient.CurrentUser.userToken;
            },
            enumerable: true,
            configurable: true
        });
        ShellViewModel.prototype.getViewName = function (viewNum) {
            return Domains[viewNum];
        };
        return ShellViewModel;
    }());
    app.component('shell', new Shell());
})(antiFakeClient || (antiFakeClient = {}));
//# sourceMappingURL=shell.js.map