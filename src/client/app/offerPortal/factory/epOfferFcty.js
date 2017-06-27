angular.module('ep.axis.offerPortal').factory('epOfferFcty', [
    '$resource', '$q', 'epAxisSettingsVal', '$http',
    function($resource, $q, epAxisSettingsVal, $http) {
        //#region === Resource ===
        var MBenzFcty = {};
        var resource = $resource(epAxisSettingsVal.apiUrl + '/oauth' + '/:action', {
            action: '@action',
        },
            {
                'getUserDetails': { method: 'POST', params: { action: 'token' } }
            }

        );
        var _getUserDetails = function (data) {
            var deferred = $q.defer();
            resource.getUserDetails(data,
                function(response) {
                    deferred.resolve(response);
                },
                function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        };

        MBenzFcty.getUserDetails = _getUserDetails;
        return MBenzFcty;
        //#endregion
    }
]);
