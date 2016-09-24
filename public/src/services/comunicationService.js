/// <reference path='../../../_clientRefernces.ts' />
var antiFakeClient;
(function (antiFakeClient) {
    var CommunictionService = (function () {
        function CommunictionService(_$http) {
            var _this = this;
            this._$http = _$http;
            this.addUser = function () {
                _this._$http.post('/users', {
                    'firstName': 'Second',
                    'lastName': 'Second',
                    'email': 'user@example.com',
                    'username': 'vladi',
                    'password': 'password',
                    'provider': 'local'
                }).then(function (d) {
                    console.log('success');
                }, (function (err) {
                    console.log(err);
                }));
            };
        }
        CommunictionService.$inject = ['$http'];
        return CommunictionService;
    }());
    antiFakeClient.CommunictionService = CommunictionService;
    angular.module('client').service('communicationService', CommunictionService);
})(antiFakeClient || (antiFakeClient = {}));
//# sourceMappingURL=comunicationService.js.map