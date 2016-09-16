/// <reference path='../../../_clientRefernces.ts' />
namespace antiFakeClient {
    export class CommunictionService {

        public addUser = () => {
            this._$http.post<void>('/users', {
                'firstName': 'Second',
                'lastName': 'Second',
                'email': 'user@example.com',
                'username': 'vladi',
                'password': 'password',
                'provider': 'local'
            }).then((d) => {
                console.log('success');
            }, (err => {
                console.log(err);
            }));
        }

        static $inject = ['$http'];

        constructor(private _$http: ng.IHttpService) {

        }
    }
    angular.module('client').service('communicationService', CommunictionService);
}