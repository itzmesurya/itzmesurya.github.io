(function () {
    'use strict';

    angular
        .module('ep.axis.layout')
        .controller('footerController', Footer);

    Footer.$inject = ['$timeout', 'logger'];
    /* @ngInject */
    function Footer($timeout, logger) {
        var vm = this;
        activate();

        function activate() {
            //logger.success(config.appTitle + ' loaded!', null);
            vm.message = 'This is footer';
            console.log('footer Activated');
        }
    }
})();
