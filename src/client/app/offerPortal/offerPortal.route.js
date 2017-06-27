(function () {
    'use strict';

    angular
        .module('ep.axis.offerPortal')
        .run(appRun);

    appRun.$inject = ['routerHelper', '$location', '$rootScope'];
    /* @ngInject */
    function appRun(routerHelper, $location, $rootScope) {
        var userExists = ['$q', '$rootScope', 'localStorageService',
            function ($q, $rootScope, localStorageService) {}
        ];

        var dealerExists = ['$q', '$rootScope', 'localStorageService',
            function ($q, $rootScope, localStorageService) {}
        ];

        routerHelper.configureStates(getStates(null), '/');
    }

    function getStates(oemDetails) {
        return [{
                state: 'offerPortal',
                config: {
                    abstract: true,
                    template: '<div ui-view></div>',
                    url: '/',
                    controller: 'Clutch',
                    title: '',
                    appTitle: '',
                    appFooterTitle: '',
                    settings: {
                        icon: 'compass'
                    }
                }
            },
            {
                state: 'offerPortal.dummy',
                config: {
                    url: '',
                    templateUrl: 'src/client/app/offerPortal/pages/materialDemo.html',
                    controller: 'materialDemoTemplate',
                    controllerAs: 'vm',
                    title: 'Materail Demo'
                }
            }
        ];
    }
})();