var antiFakeClient;
(function (antiFakeClient) {
    'use strict';
    var app = angular.module('client');
    var UserList = (function () {
        function UserList() {
            this.controller = UserListViewModel;
            this.templateUrl = 'src/components/users/userList/userList.html';
            this.controllerAs = 'vm';
        }
        return UserList;
    }());
    var UserListViewModel = (function () {
        function UserListViewModel(_communictionService) {
            this._communictionService = _communictionService;
            this.refreshUserList();
        }
        UserListViewModel.prototype.refreshUserList = function () {
            var _this = this;
            this._communictionService.getAllUsers(antiFakeClient.CurrentUser.userName, antiFakeClient.CurrentUser.userToken).then(function (a) { _this.userList = a; });
        };
        UserListViewModel.$inject = ['communicationService'];
        return UserListViewModel;
    }());
    app.component('userList', new UserList());
})(antiFakeClient || (antiFakeClient = {}));
//# sourceMappingURL=userList.js.map