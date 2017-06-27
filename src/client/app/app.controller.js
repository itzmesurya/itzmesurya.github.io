(function () {
    'use strict';

    angular
        .module('ep.axis')
        .controller('AppController', AppController);

    AppController.inject = ['$location'];

    function AppController($location) {
        var vm = this;
        /** get the url path to pick the oem name */
        var currentUrl = $location.path();
        /** parse oem name */
        vm.oemName = currentUrl.split('/')[1];
    }
})();
