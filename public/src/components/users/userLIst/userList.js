/// <reference path="../../../../../_clientRefernces.ts" />
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
    //enum UsersScreens {
    //    UserList,
    //    AddNewUser
    //}
    var UserListViewModel = (function () {
        function UserListViewModel(_communictionService) {
            this._communictionService = _communictionService;
            this._communictionService.getAllUsers(antiFakeClient.CurrentUser.userName, antiFakeClient.CurrentUser.userToken);
        }
        //public UsersScreens = UsersScreens;
        //public getViewName(viewNum: UsersScreens): string {
        //    return UsersScreens[viewNum];
        //}
        //public selectedView: UsersScreens = UsersScreens.UserList;
        //public select = (view: UsersScreens) => {
        //    this.selectedView = view;
        //}
        UserListViewModel.$inject = ['communicationService'];
        return UserListViewModel;
    }());
    app.component('userList', new UserList());
})(antiFakeClient || (antiFakeClient = {}));
//# sourceMappingURL=userList.js.map