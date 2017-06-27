(function () {
    'use strict';

    angular
         .module('ep.axis.offerPortal')
        .controller('dealerSearchController', DealerSearchController);

    DealerSearchController.$inject = ['$state', 'logger', '$epGenericDataService', '$filter', '$rootScope',
        'epAxisSettingsVal', 'localStorageService'
    ];

    function DealerSearchController($state, logger, $epGenericDataService, $filter, $rootScope,
        epAxisSettingsVal, localStorageService) {
        var vm = this;
        var objId;

        function init() {
            localStorageService.remove('clutch_dealerInfo');
            $rootScope.dealerInfo = undefined;
            setFormlyOptions();
            getDealerSearchFields();
            getOptions();
        }

        function getOptions() {
           /* $http.post('/api/getJson/countries').then(function (res) {
                vm.options.formState.countryOptions = res.data;
            });*/
            $epGenericDataService.initData(vm.options.formState.programName,
             vm.options.formState.formName,
             'Country', {},
             {
                 useCache: true,
                 excludeFormName: true
             })
             .$promise.then(function (data) {
                 vm.options.formState.states = data;
             });
        }

        function setFormlyOptions() {
            vm.options = {
                formState: {
                    programName: $rootScope.oemDetails.programName,
                    formName: 'DealerSearch',
                    keyName: 'GETDEALERS',
                    change: function ($modelValue, options, scope, $event) {
                        if (options.formControl && options.formControl.$touched) {
                            var value = angular.isUndefined($modelValue) ? '' : $modelValue;
                            $http.post('/api/filterJson', {
                                filename: 'statesList',
                                propname: 'country-code',
                                searchText: value
                            }).then(function (response) {
                                // console.log(response.data);
                                vm.options.formState.states = response.data;

                            }, function (response) {
                                // console.log(response);
                                vm.options.formState.states = [];
                            });
                            alert('dropdown changed' + $modelValue);
                        }

                    }
                }
            };

            /*vm.options = {
                formState: {
                    change: function ($modelValue, options, scope, $event) {
                        if (options.formControl && options.formControl.$touched) {
                            var value = angular.isUndefined($modelValue) ? '' : $modelValue;
                            $http.post('/api/filterJson', {
                                filename: 'statesList',
                                propname: 'country-code',
                                searchText: value
                            }).then(function (response) {
                                // console.log(response.data);
                                vm.options.formState.states = response.data;

                            }, function (response) {
                                // console.log(response);
                                vm.options.formState.states = [];
                            });
                            alert('dropdown changed' + $modelValue);
                        }

                    }
                }
            };*/
        }

        function getDealerSearchFields() {
            $epGenericDataService.getForm(vm.options.formState.programName,
                vm.options.formState.formName, {
                    isDev: epAxisSettingsVal.isDev
                })
                .$promise.then(function (data) {
                    vm.formlyFields = data;
                });
        }

        /*function editDealerCode(stateName) {
            var dealerId = vm.dealerSearch['DealerCode_obj'].OBJID.toString();
            $rootScope.processing = true;
            $epGenericDataService.setData(vm.options.formState.programName,
                vm.options.formState.formName, {
                    'formName': dealerId,
                    'keyName':'GETDEALERS',
                    'p_user': $rootScope.authInfo.loginName
                }).$promise.then(function (data) {
                    $rootScope.processing = false;
                    $rootScope.dealerInfo = {
                        dealerId: dealerId,
                        dealerName: vm.dealerSearch['DealerCode_obj'].DEALER_NAME,
                        dealerCode: vm.dealerSearch['DealerCode_obj'].DEALER_CODE
                    };
                    localStorageService.set('clutch_dealerInfo', $rootScope.dealerInfo);
                    $state.go(stateName);
                });
        }*/
        init();
    }
})();
