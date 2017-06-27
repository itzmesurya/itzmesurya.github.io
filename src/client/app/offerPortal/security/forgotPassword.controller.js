(function () {
    'use strict';

    angular
        .module('ep.axis.offerPortal')
        .controller('forgotPasswordController', ForgotPasswordController);
    /*jshint maxparams:13*/
    ForgotPasswordController.$inject = ['$state', 'logger', '$http', '$epGenericDataService',
        '$stateParams', 'localStorageService', '$rootScope',
        'epAxisSettingsVal', 'oAuthFcty', '$mdDialog'];

    function ForgotPasswordController($state, logger, $http,
        $epGenericDataService, $stateParams, localStorageService, $rootScope,
        epAxisSettingsVal, oAuthFcty, $mdDialog) {
        var vm = this;
        //Init call declaration...
        vm.init = function () {
            vm.chPwdInfo = {};
            setFormlyOptions();
            getformlyFields();
        };
        //...............................
        //Login field defination.......
        function getformlyFields() {
            $epGenericDataService.getForm(vm.options.formState.programName,
                vm.options.formState.formName)
                .$promise.then(function (data) {
                    vm.formlyFields = data;
                });
        }
        //.............................................
        //Formly options........
        function setFormlyOptions() {
            vm.options = {
                formState: {
                    programName: $rootScope.oemDetails.programName,
                    formName: 'ForgotPassword',
                    returnToLogin: vm.returnToLogin,
                    submit: vm.submit
                }
            };
        }
        //.....................................
        //Enter click function.......
        vm.submit = function () {
            if (vm.formlyform.$valid) {
                passwordReset();
            }
            else {
                angular.forEach(vm.formlyform.$error, function (field) {
                    angular.forEach(field, function (errorField) {
                        errorField.$setTouched();
                    });
                });
            }
        };
        vm.returnToLogin = function () {
            $state.go('offerPortal.adminlogin');
        };
        function passwordReset() {
            var params = {
                'p_user_objid': vm.chPwdInfo.userEmail,
                'p_email': vm.chPwdInfo.userEmail,
                'p_clientid': '',
                'p_clientSecret': ''
            };

            oAuthFcty.userForgotPassword({
                programName: vm.options.formState.programName,
                params: params
            })
                .$promise.then(function (data) {
                    if (angular.isDefined(data.dataRows)) {
                        vm.getClutchData = data.dataRows[0];
                        var message;
                        if (vm.getClutchData.STATUS === 1) {
                            message = vm.getClutchData.MESSAGE;
                            generatePopup(message, '');
                        }
                        else if (vm.getClutchData.STATUS === 0) {
                            message = 'Your Password reset was succcessful and a Password has ' +
                                'been emailed to you. Please click ok to return to the Login screen.';
                            generatePopup(message, 'clutch.account.login');
                        }
                        else {
                            message = 'Error in saving';
                            generatePopup(message, '');
                        }
                    }
                });
        }
        //Generate Popup......................
        function generatePopup(message, redirectState) {
            $mdDialog.show(                
                $mdDialog.alert()                
                    .parent(angular.element(document.querySelector('#popupContainer')))                    
                    .clickOutsideToClose(true)                    
                    .title('Thank you')                
                    .textContent('Reset password link has been sent to the email address provided.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Ok')
                    .targetEvent(message)
            );
        };



        // var modalInstance = $Modal.open({
        //     templateUrl: 'app/clutch/messagebox.html',
        //     controller: 'confirmPopupController',
        //     controllerAs: 'vm',
        //     size: 'sm',
        //     backdrop: 'static',
        //     keyboard: false,
        //     backdropClass: 'modal-backdrop fade in',
        //     resolve: {
        //         message: function () {
        //             return message;
        //         },
        //         title: function () {
        //             return '';
        //         },
        //         hideCancel: function () {
        //             return true;
        //         },
        //         isWarning: function () {
        //             return false;
        //         },
        //         okText: function () {
        //             return 'OK';
        //         },
        //         cancelText: function () {
        //             return '';
        //         },
        //         redirectState: function () {
        //             return redirectState;
        //         }
        //     }
        // });
        //}
        //.............................
        //Call init function.......
        vm.init();
        //...........................
    }
})();
