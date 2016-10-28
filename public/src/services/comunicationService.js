/// <reference path='../../../_clientRefernces.ts' />
var antiFakeClient;
(function (antiFakeClient) {
    var CommunictionService = (function () {
        function CommunictionService(_$http, _$q) {
            var _this = this;
            this._$http = _$http;
            this._$q = _$q;
            this.getAllUsers = function (username, usertoken) {
                var retDefer = _this._$q.defer();
                _this._$http.get('/user', {
                    params: {
                        token: antiFakeClient.CurrentUser.userToken,
                        username: antiFakeClient.CurrentUser.userName
                    }
                }).then(function (res) {
                    retDefer.resolve(res.data);
                }, function (err) {
                    retDefer.reject(err);
                    if (err.status) {
                        _this.checkResStatus(err.status);
                    }
                });
                return retDefer.promise;
            };
            this.login = function (username, password) {
                var retDefer = _this._$q.defer();
                antiFakeClient.CurrentUser.userName = username;
                _this._$http.post('/user/login', {
                    username: username,
                    password: password
                }).then(function (res) {
                    if (res.data && res.data.gotToken) {
                        antiFakeClient.CurrentUser.userToken = res.data.token;
                        retDefer.resolve(null);
                    }
                    else {
                        var errMsg = 'Can\'t login! try later';
                        if (res.data && !res.data.gotToken && res.data.message) {
                            errMsg = res.data.message;
                        }
                        antiFakeClient.CurrentUser.userToken = null;
                        retDefer.reject(errMsg);
                    }
                }, function (err) {
                    antiFakeClient.CurrentUser.userToken = null;
                    retDefer.reject(err.toString());
                    //todo show error to user
                });
                return retDefer.promise;
            };
        }
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
        CommunictionService.prototype.checkResStatus = function (status) {
            if (status == '401') {
                //todo show timeout message
                antiFakeClient.CurrentUser.userToken = null;
            }
        };
        CommunictionService.$inject = ['$http', '$q'];
        return CommunictionService;
    }());
    antiFakeClient.CommunictionService = CommunictionService;
    angular.module('client').service('communicationService', CommunictionService);
})(antiFakeClient || (antiFakeClient = {}));
//# sourceMappingURL=comunicationService.js.map