(function () {
    'use strict';

    angular
        .module('ep.axis.layout')
        .controller('Shell', Shell);

    Shell.$inject = ['$timeout', 'logger'];
    /* @ngInject */
    function Shell($timeout, logger) {
        var vm = this;

        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.showSplash = true;
        vm.tagline = {
            text: 'Created by WE2.0 team',
            link: 'http://www.webenrollment.aspenrms.com'
        };

        activate();

        function activate() {
            //logger.success(config.appTitle + ' loaded!', null);
            hideSplash();
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function () {
                vm.showSplash = false;
            }, 1000);
        }
    }
})();
