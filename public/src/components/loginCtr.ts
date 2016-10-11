/// <reference path="../../../_clientRefernces.ts" />
namespace antiFakeClient {
    'use strict'
    let app = angular.module('client');

    class LoginCtr implements ng.IComponentOptions {
        controller: Function = LoginCtrViewModel;
        templateUrl = 'src/components/loginCtr.html';
        controllerAs = 'vm';
    }

    class LoginCtrViewModel implements ng.IComponentController {
        public userName: string;
        public password: string;
        public errorMessage: string;

        public login = (username: string, password: string) => {
            this._communictionService.login(username, password).then(null, (err) => {
                this.errorMessage = err;
            });
        }

        static $inject = ['communicationService'];
        constructor(private _communictionService: CommunictionService) {
        }
    }
    app.component('loginCtr', new LoginCtr());
}