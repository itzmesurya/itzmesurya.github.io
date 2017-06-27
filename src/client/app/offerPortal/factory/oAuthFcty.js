angular.module('ep.axis.offerPortal').factory('oAuthFcty', [
    '$resource', '$q', 'epAxisSettingsVal', '$http',
    function ($resource, $q, epAxisSettingsVal, $http) {
        //#region === Resource ===
        var oAuthFcty = {};
        var resource = $resource(epAxisSettingsVal.apiUrl + '/oauth' + '/:action/:programName', {
            action: '@action',
            programName: '@programName'
        },
            {
                'userRegistration': { method: 'POST', params: { action: 'register' } },
                'userLogout': { method: 'POST', params: { action: 'logout' } },
                'userForgotPassword': { method: 'POST', params: { action: 'forgotpassword' } },
            }

        );
        var _userRegistration = function (data) {
            var deferred = $q.defer();
            resource.userRegistration(data,
                function (response) {
                    deferred.resolve(response);
                },
                function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        };

        var _userLogout = function (data) {
            var deferred = $q.defer();
            resource.userLogout(data,
                function (response) {
                    deferred.resolve(response);
                },
                function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        };

        var _userForgotPassword = function (data) {
            var deferred = $q.defer();
            resource.userForgotPassword(data,
                function (response) {
                    deferred.resolve(response);
                },
                function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        };

        oAuthFcty.userRegistration = _userRegistration;
        oAuthFcty.userLogout = _userLogout;
        oAuthFcty.userForgotPassword = _userForgotPassword;

        //return oAuthFcty;
        return resource;
        //#endregion
    }
]);
