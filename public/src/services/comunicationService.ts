/// <reference path='../../../_clientRefernces.ts' />
namespace antiFakeClient {
    export class CommunictionService {
        //public addUser = () => {
        //    this._$http.post<void>('/users', {
        //        'firstName': 'Second',
        //        'lastName': 'Second',
        //        'email': 'user@example.com',
        //        'username': 'vladi',
        //        'password': 'password',
        //        'provider': 'local'
        //    }).then((d) => {
        //        console.log('success');
        //    }, (err => {
        //        console.log(err);
        //    }));
        //}

        public getAllUsers = (username: string, usertoken: string): ng.IPromise<User[]> => {
            var retDefer = this._$q.defer<User[]>();
            this._$http.get<User[]>('/user', {
                params: {
                    token: CurrentUser.userToken,
                    username: CurrentUser.userName
                }
            }).then((res) => {
                retDefer.resolve(res.data)
            },
                (err) => {
                    retDefer.reject(err)
                });
            return retDefer.promise;
        };

        public login = (username: string, password: string): ng.IPromise<string> => {
            var retDefer = this._$q.defer<string>();
            CurrentUser.userName = username;
            this._$http.post<{ gotToken: boolean; token: string; message: string }>('/user/login', {
                username: username,
                password: password
            }).then((res) => {
                if (res.data && res.data.gotToken) {
                    CurrentUser.userToken = res.data.token;
                    retDefer.resolve(null);
                } else {
                    var errMsg = 'Can\'t login! try later';
                    if (res.data && !res.data.gotToken && res.data.message) {
                        errMsg = res.data.message;
                    }
                    CurrentUser.userToken = null;
                    retDefer.reject(errMsg);
                }
            }, (err) => {
                CurrentUser.userToken = null;
                retDefer.reject(err.toString());
                //todo show error to user
            });
            return retDefer.promise;

        }

        static $inject = ['$http', '$q'];

        constructor(private _$http: ng.IHttpService, private _$q: ng.IQService) {

        }
    }
    angular.module('client').service('communicationService', CommunictionService);
}