﻿/// <reference path="../../../_clientRefernces.ts" />
namespace antiFakeClient {
    let app = angular.module('client');

    class LoginCtr implements ng.IComponentOptions {
        controller: Function = LoginCtrViewModel;        
        templateUrl = 'src/components/loginCtr.html';
        controllerAs = 'vm';
      
    }

    class LoginCtrViewModel implements ng.IComponentController {
        public t = 'dddd';
        constructor() {
        }

    }
    app.component('loginCtr', new LoginCtr());
}