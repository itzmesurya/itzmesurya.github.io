(function () {
    'use strict';

    angular
        .module('ep.axis.offerPortal')
        .run(appRun);

    appRun.$inject = ['routerHelper', 'epAxisClutchStates', '$location', '$rootScope'];
    /* @ngInject */
    function appRun(routerHelper, epAxisClutchStates, $location, $rootScope) {
        var userExists = ['$q', '$rootScope', 'localStorageService',
            function ($q, $rootScope, localStorageService) {
                var deferred = $q.defer();
                // if (!$rootScope.authInfo) {
                //     var lsAuthInfo = localStorageService.get('clutch_authInfo');
                //     if (lsAuthInfo !== undefined && lsAuthInfo !== null) {
                //         $rootScope.authInfo = lsAuthInfo;
                //         deferred.resolve($rootScope.authInfo);
                //     } else {
                //         deferred.reject({
                //             message: 'User not found.',
                //             handlerPath: '/401'
                //         });
                //     }

                // } else {
                //     deferred.resolve($rootScope.authInfo);
                // }
                return deferred.promise;
            }
        ];

        var dealerExists = ['$q', '$rootScope', 'localStorageService',
            function ($q, $rootScope, localStorageService) {
                var deferred = $q.defer();
                // if (!$rootScope.dealerInfo) {
                // var lsDealerInfo = localStorageService.get('clutch_dealerInfo');
                // if (lsDealerInfo !== undefined && lsDealerInfo !== null) {
                //     $rootScope.dealerInfo = lsDealerInfo;
                //     deferred.resolve($rootScope.dealerInfo);
                // } else {
                //     deferred.reject({
                //         message: 'Dealer not found.',
                //         handlerPath: '/401'
                //     });
                // }

                // } else {
                //     deferred.resolve($rootScope.dealerInfo);
                // }
                return deferred.promise;
            }
        ];

        /** get the url path to pick the oem name */
        var currentUrl = $location.path();
        /** parse oem name */
        var oemName = currentUrl.split('/')[1];
        /** instantiate an oemDetails object */
        var oemDetails = {};
        oemName = "NISSAN";
        oemDetails.oem = oemName;
        console.log("oem name==>" + oemName);
        oemDetails.programName = oemName.toUpperCase() + 'DIGITALSERVICEMARKETING';
        $rootScope.oemDetails = oemDetails;
        routerHelper.configureStates(getStates(oemDetails), '/');
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
                    templateUrl: 'app/offerPortal/pages/materialDemo.html',
                    controller: 'materialDemoTemplate',
                    controllerAs: 'vm',
                    title: 'Materail Demo'
                }
            },
            {
                state: 'offerPortal.materialDemo',
                config: {
                    url: 'materialdemo',
                    templateUrl: 'app/offerPortal/pages/materialDemo.html',
                    controller: 'materialDemoTemplate',
                    controllerAs: 'vm',
                    title: 'Materail Demo',
                    params: {
                        program: 'demo'
                    }
                }
            }, {
                state: 'offerPortal.home',
                config: {
                    url: 'home',
                    templateUrl: 'app/offerPortal/pages/home.html',
                    controller: 'homeController',
                    controllerAs: 'cl',
                    title: 'Coupon Portal Home Page',
                    access: 'auth'
                }
            },
            {
                state: 'offerPortal.default',
                config: {
                    url: '/:programName',
                    templateUrl: 'app/offerPortal/security/adminlogin.html',
                    controller: 'adminLoginController',
                    controllerAs: 'cl',
                    title: 'Admin Login'
                }
            },
            {
                state: 'offerPortal.nissanadminlogin',
                config: {
                    url: 'adminlogin',
                    templateUrl: 'app/offerPortal/security/adminlogin.html',
                    controller: 'adminLoginController',
                    controllerAs: 'cl',
                    title: 'Admin Login'
                }
            },
            {
                state: 'offerPortal.forgotpassword',
                config: {
                    url: 'forgotpassword',
                    templateUrl: 'app/offerPortal/security/forgotPassword.html',
                    controller: 'forgotPasswordController',
                    controllerAs: 'vm',
                    title: 'Forgot Password'
                }
            },
            {
                state: 'offerPortal.dealersearch',
                config: {
                    url: 'dealersearch',
                    templateUrl: 'app/offerPortal/pages/admin/dealersearch.html',
                    controller: 'dealerSearchController',
                    controllerAs: 'vm',
                    title: 'Dealer Search',
                    access: 'auth'
                }
            },
            {
                state: 'offerPortal.changepassword',
                config: {
                    url: 'changepassword',
                    templateUrl: 'app/offerPortal/security/changePassword.html',
                    controller: 'changepasswordController',
                    controllerAs: 'vm',
                    title: 'Change Password',
                    access: 'auth'
                }
            },

            {
                state: 'offerPortal.enrollmentreport',
                config: {
                    url: 'enrollmentreport',
                    templateUrl: 'app/offerPortal/Pages/admin/enrollmentreport.html',
                    controller: 'enrollmentreportController',
                    controllerAs: 'vm',
                    title: 'Enrollment Report',
                    access: 'auth'
                }
            },


            {
                state: 'offerPortal.dealerprofile',
                config: {
                    url: 'dealerprofile',
                    templateUrl: 'app/offerPortal/pages/dealer/dealerprofile.html',
                    controller: 'dealerProfileController',
                    controllerAs: 'dp',
                    title: 'Dealer Profile',
                    access: 'auth'
                }
            },
            {
                state: 'offerPortal.contactus',
                config: {
                    url: 'contactus',
                    templateUrl: 'app/offerPortal/pages/dealer/contactus.html',
                    controller: 'contactusController',
                    controllerAs: 'cl',
                    title: 'Contact Us',
                    access: 'auth'
                }
            },
            {
                state: 'offerPortal.summary',
                config: {
                    url: 'summary',
                    templateUrl: 'app/offerPortal/pages/dealer/summary.html',
                    controller: 'summaryController',
                    controllerAs: 'cl',
                    title: 'Summary',
                    access: 'auth'
                }
            },
            {
                state: 'offerPortal.transactionlog',
                config: {
                    url: 'transactionlog',
                    templateUrl: 'app/offerPortal/pages/dealer/transactionlog.html',
                    controller: 'transactionlogController',
                    controllerAs: 'cl',
                    title: 'Transaction Log',
                    access: 'auth'
                }
            },
            {
                state: 'offerPortal.couponselection',
                config: {
                    url: 'couponselection',
                    templateUrl: 'app/offerPortal/pages/dealer/couponselection.html',
                    controller: 'couponselectionController',
                    controllerAs: 'cl',
                    title: 'Coupon Selection',
                    access: 'auth'
                }
            },
            {
                state: 'offerPortal.aboutus',
                config: {
                    url: 'aboutus',
                    templateUrl: 'app/offerPortal/pages/aboutus.html',
                    controller: 'aboutusController',
                    controllerAs: 'cl',
                    title: 'About Us',
                    access: 'auth'
                }
            },

            {
                state: 'offerPortal.demo',
                config: {
                    url: 'demo',
                    templateUrl: 'app/offerPortal/demo.html',
                    controller: 'demoController',
                    controllerAs: 'vm',
                    title: 'Demo'
                }
            },
            {
                state: 'offerPortal.adminlogin',
                config: {
                    url: 'adminlogin',
                    templateUrl: 'app/offerPortal/security/adminlogin.html',
                    controller: 'AdminLogin',
                    controllerAs: 'cl',
                    oemDetails: oemDetails,
                    title: 'Admin Login'
                }
            }
        ];
    }
})();
