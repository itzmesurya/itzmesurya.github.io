(function () {
    'use strict';

    var offerPortal = angular.module('ep.axis.offerPortal');

    offerPortal.config(configure);

    configure.$inject = ['$httpProvider'];

    /* @ngInject */
    function configure($httpProvider) {
        $httpProvider.interceptors.push(['$q', '$location', 'localStorageService', 'logger',
            function ($q, $location, localStorageService, logger) {
                return {
                    'request': function (config) {
                        config.headers = config.headers || {};
                        var authInfo = localStorageService.get('clutch_authInfo');
                        if (authInfo && authInfo.accessToken && authInfo.accessToken.length) {
                            config.headers.Authorization = 'Bearer ' + authInfo.accessToken;
                        }
                        return config;
                    },
                    'responseError': function (response) {
                        if (response.status === 401 || response.status === 403) {
                            logger.error('Either your session expired or you are not logged in.');
                            $location.path('/401');
                        }
                        return $q.reject(response);
                    }
                };
            }]);
    }
})();
