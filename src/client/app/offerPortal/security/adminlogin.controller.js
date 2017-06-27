(function () {
    'use strict';

    angular
        .module('ep.axis.offerPortal')
        .controller('adminLoginController', AdminLoginController);
    AdminLoginController.$inject = ['$state', 'logger', '$http', '$epGenericDataService',
            '$stateParams', 'localStorageService', '$rootScope','epOfferFcty',
             'epAxisSettingsVal'];

    function AdminLoginController($state, logger, $http,
        $epGenericDataService, $stateParams, localStorageService, $rootScope,epOfferFcty,
          epAxisSettingsVal) {
        var cl = this;
        console.log("in Adminlogin controller...");
        //Init call declaration...
        cl.init = function () {
            cl.logininfo = {};
            setFormlyOptions();
            getFormlyFields();
        };
        //...............................
        //Login field defination.......
        function getFormlyFields() {
            $epGenericDataService.getForm(cl.options.formState.programName,
                cl.options.formState.formName)
                .$promise.then(function (data) {
                    cl.formlyfields = data;
                    var getData = localStorageService.get('getMBData');
                    if (angular.isDefined(getData) && getData === null) {
                        getData = {};
                    }
                    getData.headerFormFields = cl.formlyfields.headerImg;
                    localStorageService.set('getMBData', getData);
                    //globalService.notifyObservers(localStorageService.get('getMBData'));
                });
        }
        //.............................................
        //Formly options........
        function setFormlyOptions() {
            cl.options = {
                formState: {
                    programName: $rootScope.oemDetails.programName,
                    formName: 'AdminLogin',
                    login: cl.login,
                    dealerLogin: cl.dealerLogin,
                    resetPassword: cl.resetPassword                    

                }
            };
        }
        //.....................................
        //Enter click function.......
        cl.login = function () {
            if (cl.loginForm.$valid) {
                getMBData();

            } else {
                angular.forEach(cl.loginForm.$error, function (field) {
                    angular.forEach(field, function (errorField) {
                        errorField.$setTouched();
                    });
                });
            }
        };

        //...................................
        //Get MB data.................
        function getMBData() {
            console.log('role' + cl.logininfo.userRole);
            var params = {
                'client_id':   $rootScope.oemDetails.programName,
                'client_secret': $rootScope.oemDetails.programName,
                'grant_type': 'password',
                'username': {
                    'username': cl.logininfo.username,
                    'role': cl.logininfo.userRole
                },
                'password': cl.logininfo.password
            };
            $rootScope.processing = true;
            epOfferFcty.getUserDetails(params).then(
                function (response) {
                    var data = response;
                    if (angular.isDefined(data.user)) {
                        if (data.user.STATUS === 0) {
                            logger.success('You are successfully logged in.');
                            if (data.token_type === 'bearer') {
                                setTokenInHeaders(data.access_token);
                                //store Data in localStorageService
                                var getData = localStorageService.get('getMBData');
                                if (!angular.isDefined(getData) || getData === null) {
                                    getData = {};
                                }
                                getData.userDetails = data.user;
                                localStorageService.set('getMBData', getData);
                                //globalService.notifyObservers(localStorageService.get('getMBData'));
                                $state.go('offerPortal.home');
                            }

                        } else if (data.user.STATUS === 1) {
                            logger.error('Authentication Failed');
                        }
                    }
                },
                function (error) {
                    logger.error('Authentication Failed');

                });
            $rootScope.processing = false;
        }

        function setTokenInHeaders(token) {
            localStorageService.set('authToken', token);
        }

        cl.dealerLogin = function () {
            $state.go('offerPortal.adminlogin');
        };

        cl.resetPassword = function () {
            $state.go('offerPortal.forgotpassword');
        };        
        //.............................
        //Call init function.......
        cl.init();
        //...........................
    }
})();