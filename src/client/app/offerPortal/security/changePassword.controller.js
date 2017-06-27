(function () {
    'use strict';

    angular
        .module('ep.axis.offerPortal')
        .controller('changepasswordController', ChangepasswordController);
    // jshint camelcase: false
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    /*jshint maxparams:13*/
    ChangepasswordController.$inject = ['$state', 'logger', '$http', '$epGenericDataService',
        '$stateParams', 'localStorageService', '$rootScope', 
         'epAxisSettingsVal','$mdDialog'];
    function ChangepasswordController($state, logger, $http,
        $epGenericDataService, $stateParams, localStorageService, $rootScope,
          epAxisSettingsVal,$mdDialog) {
        var vm = this;
        //.......................................
        //Init call declaration...
        vm.init = function () {
            vm.chPwdInfo = {};
            setFormlyOptions();
            getFormFields();
        };
        function getFormFields() {
            $epGenericDataService.getForm(vm.options.formState.programName,
                vm.options.formState.formName)
                .$promise.then(function (data) {
                    vm.formlyFields = data;
                });
        }
        vm.chkWithPwd = function (pwd, conPwd) {
            var flag = true;
            if (pwd != null) {
                // if (pwd === $rootScope.authInfo.loginName) {
                //     logger.warning('ERROR! New password should not be your login name.');
                //     flag = false;
                // }
                // else 
                if (conPwd != null && pwd !== conPwd) {
                    logger.warning('ERROR! The New Password and Confirm New ' +
                        'Password does not match');
                    flag = false;
                }
            }
            return flag;
        };
        //.....................................
        //Enter click function.......
        vm.submit = function () {
            if (vm.formlyform.$valid) {
                var isValidPwd = vm.chkWithPwd(vm.chPwdInfo.userNewPassword,
                    vm.chPwdInfo.userConfirmPassword);
                if (isValidPwd) {
                    changePassword();
                }
            }
            else {
                angular.forEach(vm.formlyform.$error, function (field) {
                    angular.forEach(field, function (errorField) {
                        errorField.$setTouched();
                    });
                });
            }
        };

        vm.clickcancel = function () {
            $state.go('offerPortal.home');
        };
        //.............................................
        //Formly options........
        function setFormlyOptions() {
            vm.options = {
                formState: {
                    programName: $rootScope.oemDetails.programName,
                    formName: 'ChangePassword',
                    submit: vm.submit,
                    chkWithPwd: vm.chkWithPwd,
                    clickcancel: vm.clickcancel
                }
            };
        }
        function changePassword() {
            var params = {
                'p_programname': vm.options.formState.programName,
                // 'p_user_objid': $rootScope.authInfo.loginName,
                // 'p_old_password': vm.chPwdInfo.userCurrentPassword,
                'p_new_password': vm.chPwdInfo.userNewPassword
            };
            $epGenericDataService
                .setData(vm.options.formState.programName,
                vm.options.formState.formName, params)
                .$promise.then(function (data) {
                    if (angular.isDefined(data.dataRows) &&
                        data.dataRows.length > 0) {
                        var response = data.dataRows[0];
                        if (response.STATUS === 1) {
                            var message = response.MESSAGE;
                            generatePopup(message, '');
                        }
                        else if (response.STATUS === 0) {
                            var message0 = 'Your Password has been successfully changed.';
                            logger.success(message0);
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
                    .textContent('Your Password has been successfully changed.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Ok')
                    .targetEvent(message)
            );
        };

        // function generatePopup(message, redirectState) {
        //     var modalInstance = $modal.open({
        //         templateUrl: 'app/clutch/messagebox.html',
        //         controller: 'confirmPopupController',
        //         controllerAs: 'vm',
        //         size: 'sm',
        //         backdrop: 'static',
        //         keyboard: false,
        //         backdropClass: 'modal-backdrop fade in',
        //         resolve: {
        //             message: function () {
        //                 return message;
        //             },
        //             title: function () {
        //                 return '';
        //             },
        //             hideCancel: function () {
        //                 return true;
        //             },
        //             isWarning: function () {
        //                 return false;
        //             },
        //             okText: function () {
        //                 return 'OK';
        //             },
        //             cancelText: function () {
        //                 return '';
        //             },
        //             redirectState: function () {
        //                 return redirectState;
        //             }
        //         }
        //     });
        // }
        //.............................
        //Call init function.......
        vm.init();
        //...........................
    }
})();
