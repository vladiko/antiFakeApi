/// <reference path="../../../../_clientRefernces.ts" />
namespace antiFakeClient {
    'use strict'
    let app = angular.module('client');

    class Shell implements ng.IComponentOptions {
        controller: Function = ShellViewModel;
        templateUrl = 'src/components/shell/shell.html';
        controllerAs = 'vm';
    }

    enum Domains {
        Users,
        Producers
    }

    class ShellViewModel implements ng.IComponentController {

        public get isAuthenticated(): boolean {
            return !!CurrentUser.userToken;
        }
        public Domains = Domains;
        public getViewName(viewNum: Domains): string {
            return Domains[viewNum];
        }

        public selectedView: Domains = Domains.Users;
        public select = (view: Domains) => {
            this.selectedView = view;
        }
    }
    app.component('shell', new Shell());
}