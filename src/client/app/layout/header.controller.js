(function () {
    'use strict';

    angular
        .module('ep.axis.layout')
        .controller('headerController', Header);

    Header.$inject = ['$timeout', 'logger'];
    /* @ngInject */
    function Header($timeout, logger) {
        var vm = this;
        vm.menuItems = [{
            name: 'Navigation Menu',
            items: [{
                    name: 'Form Elements',
                    url: '/demo'
                },
                {
                    name: 'Material Demo',
                    url: ''
                },
                {
                    name: 'About Coupon Library',
                    url: '#'
                },
                {
                    name: 'Coupon Selector',
                    url: '#'
                },
                {
                    name: 'Summary Area',
                    url: '#'
                },
                {
                    name: 'Transaction Log',
                    url: '#'
                },
                {
                    name: 'Contact Us',
                    url: '#'
                }
            ]
        }, {
            name: 'Adminstration Menu',
            items: [{
                    name: 'Manage Administration Users',
                    url: '#'
                },
                {
                    name: 'Add / Edit Coupon',
                    url: '#'
                },
                {
                    name: 'Approve Dealer Coupon',
                    url: '#'
                },
                {
                    name: 'Manage Reminder Services',
                    url: '#'
                },
                {
                    name: 'Manage Library API',
                    url: '#'
                },
                {
                    name: 'Enrollment Report',
                    url: '#'
                }
            ]
        }];
        activate();

        function activate() {
            //logger.success(config.appTitle + ' loaded!', null);
            vm.message = 'This is header';
            console.log('header Activated');
        }
    }
})();
