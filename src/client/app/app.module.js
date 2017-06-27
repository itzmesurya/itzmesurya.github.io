(function () {

    'use strict';

    var epAxisSettingsVal = {};

    angular.module('ep.axis', [
        /* Shared modules */
        'ep.axis.core',
        'ep.generic.dataservice',
        /*Epsilon Formly*/
        'ep.formly.theme',
        /* Feature areas */
        'ep.axis.layout',

        /* offerPortal*/
        'ep.axis.offerPortal',

        /* Third party */
        'ngResource'
    ]).config(['$epGenericDataServiceProvider', function ($epGenericDataServiceProvider) {
        $epGenericDataServiceProvider.init(epAxisSettingsVal);
    }]);

    // Bootstrap Axis to get environment variables beforehand
    fetchData();

    function fetchData() {
        var initInjector = angular.injector(['ng']);
        var $http = initInjector.get('$http');

        return $http.get('/app/appConstants.json').then(function (response) {
            epAxisSettingsVal.apiUrl = response.data.genericApiUrl;
            epAxisSettingsVal.isDev = response.data.isDev;
            epAxisSettingsVal.isGenericApiSecure = response.data.isGenericApiSecure;
            epAxisSettingsVal.cacheEnabled = response.data.cacheEnabled;
            epAxisSettingsVal.applicationName = response.data.applicationName;
            angular.module('ep.axis.core').constant('epAxisSettingsVal', epAxisSettingsVal);
            fetchClutchStates(epAxisSettingsVal.isDev).then(bootstrapApplication);
        }, function (errorResponse) {
            // Handle error case
        });
    }

    function fetchClutchStates(isDev) {
        var initInjector = angular.injector(['ng']);
        var $http = initInjector.get('$http');
        if (!isDev) {
            return $http.post(epAxisSettingsVal.apiUrl +
                    (epAxisSettingsVal.isGenericApiSecure ?
                        '/securegenericdataservice' : '/genericdataservice') +
                    '/getRoutesData/' + getParameterByName('programName'), {
                        cachingInfo: {
                            useCache: epAxisSettingsVal.cacheEnabled
                        }
                    })
                .then(function (response) {
                    angular.module('ep.axis').value('epAxisClutchStates',
                        response.data.stateSchema);
                }, function (errorResponse) {
                    // Handle error case
                });
        } else {
            return $http.get('/app/offerPortal/states/' + getParameterByName() + '.json')
                .then(function (data) {
                    angular.module('ep.axis').value('epAxisClutchStates',
                        data.stateSchema);
                });
        }
    }

    function bootstrapApplication() {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['ep.axis']);
        });
    }

    function getParameterByName() {
        var currentUrl = window.location.pathname;
        /** parse oem name */
        var oemName = currentUrl.split('/')[1];
        /** instantiate an oemDetails object */
        
        //var result = 'CUSTOMER PREFERENCES CENTER ' + oemName.toUpperCase();
        var result = oemName.toUpperCase() + 'DIGITALSERVICEMARKETING';
        return decodeURIComponent(result.replace(/\+/g, ' '));
    }
})();
