/// <reference path="../../../../_clientRefernces.ts" />
namespace antiFakeClient {
    'use strict'
    let app = angular.module('client');

    class Users implements ng.IComponentOptions {
        controller: Function = UsersViewModel;
        templateUrl = 'src/components/users/users.html';
        controllerAs = 'vm';
    }

    enum UsersScreens {
        UserList,
        AddNewUser
    }

    class UsersViewModel implements ng.IComponentController {
        public UsersScreens = UsersScreens;
        public getViewName(viewNum: UsersScreens): string {
            return UsersScreens[viewNum];
        }

        public selectedView: UsersScreens = UsersScreens.UserList;
        public select = (view: UsersScreens) => {
            this.selectedView = view;
        }
        
        static $inject = ['communicationService'];
        constructor(private _communictionService: CommunictionService) {
        }
    }
    app.component('users', new Users());
}