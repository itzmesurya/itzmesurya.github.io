(function () {
    'use strict';

    angular
        .module('ep.axis.offerPortal')
        .controller('Clutch', Clutch);

    Clutch.$inject = ['$state', 'logger', '$rootScope',
        '$epGenericDataService', '$http'];
    function Clutch($state, logger, $rootScope, $epGenericDataService, $http) {
        function setTraceHttpHeaders() {
            if (angular.isDefined($state.params.eTraceFlag)) {
                $http.defaults.headers.common['TraceFlag'] = $state.params.eTraceFlag;
            }
        }
        setTraceHttpHeaders();
        $state.go('offerPortal.materialDemo');
    }
})();
