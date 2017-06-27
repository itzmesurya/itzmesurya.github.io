(function () {
    'use strict';

    angular
         .module('ep.axis.offerPortal')
        .controller('Account', Account);

    Account.$inject = ['$state', 'logger', '$stateParams', '$rootScope',
        '$epGenericDataService', '$http', 'ready'];
    function Account($state, logger, $stateParams, $rootScope,
        $epGenericDataService, $http, ready) {
        var vm = this;
    }

})();
