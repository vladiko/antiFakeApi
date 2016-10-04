/// <reference path="../../../../_clientRefernces.ts" />
var antiFakeClient;
(function (antiFakeClient) {
    'use strict';
    var app = angular.module('client');
    var Users = (function () {
        function Users() {
            this.controller = UsersViewModel;
            this.templateUrl = 'src/components/users/users.html';
            this.controllerAs = 'vm';
        }
        return Users;
    }());
    var UsersScreens;
    (function (UsersScreens) {
        UsersScreens[UsersScreens["UserList"] = 0] = "UserList";
        UsersScreens[UsersScreens["AddNewUser"] = 1] = "AddNewUser";
    })(UsersScreens || (UsersScreens = {}));
    var UsersViewModel = (function () {
        function UsersViewModel(_communictionService) {
            var _this = this;
            this._communictionService = _communictionService;
            this.UsersScreens = UsersScreens;
            this.selectedView = UsersScreens.UserList;
            this.select = function (view) {
                _this.selectedView = view;
            };
        }
        UsersViewModel.prototype.getViewName = function (viewNum) {
            return UsersScreens[viewNum];
        };
        UsersViewModel.$inject = ['communicationService'];
        return UsersViewModel;
    }());
    app.component('users', new Users());
})(antiFakeClient || (antiFakeClient = {}));
//# sourceMappingURL=users.js.map