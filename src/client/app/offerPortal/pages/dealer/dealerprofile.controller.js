(function () {
    'use strict';

   angular
        .module('ep.axis.offerPortal')
        .controller('dealerProfileController', DealerProfileController)
    /*jshint maxparams:13*/
   DealerProfileController.$inject = ['$state', 'logger', '$http', '$epGenericDataService',
        '$stateParams', 'localStorageService',  'epOfferFcty', '$rootScope', 
         'epAxisSettingsVal'
    ];

   function DealerProfileController($state, logger, $http,
        $epGenericDataService, $stateParams, localStorageService, epOfferFcty, 
        $rootScope, epAxisSettingsVal) { //$modal, globalService,
        var mb = this;
        //.......................................
        //Init call declaration...
        function init() {
            //set formly field options
            setFormlyOptions();
            //get User info from localStorageService
            //getMBData();
            //get form Data and bind to localStorageService
            //getInitalFormData();
            //get formly field defination and notify Header
            getFormlyFields();
        }
        //...............................
        // Get Master Data from LocalStorageService
        function getMBData() {
            if (angular.isDefined(localStorageService.get('enrollmentSteps')) &&
                localStorageService.get('enrollmentSteps') !== 'Step1') {
                $state.go('mercedesbenz.listSelection');
            }
            mb.getMBData = localStorageService.get('getMBData');
            if (angular.isUndefined(mb.getMBData.enrollmentDetails) ||
                angular.isUndefined(mb.getMBData.enrollmentDetails.campaignEnrollmentDetails) ||
                mb.getMBData.enrollmentDetails.campaignEnrollmentDetails === null) {
                $state.go('mercedesbenz.listSelection');
            }
        }
        //........................................
        //Set Formly options........
        function setFormlyOptions() {
            mb.options = {
                formState: {
                    programName: $rootScope.oemDetails.programName,
                    formName: 'DealerProfile',
                    next: next,
                    back: back
                }
            };
        }
        //...........................................
        //Get Formly Field Definations.......
        function getFormlyFields() {
            $epGenericDataService.getForm(mb.options.formState.programName,
                mb.options.formState.formName)
                .$promise.then(function (data) {
                    mb.formlyFields = data;
                    //mb.formlyFields.personalizationForm = jsonParser.parseJson(data.personalizationForm);
                    //mb.getMBData.headerFormFields = mb.formlyFields.headerImg;
                    //localStorageService.set('getMBData', mb.getMBData);
                    //globalService.notifyObservers(localStorageService.get('getMBData'));
                });
        }
        //.............................................
        //formState click functions.......
        function next() {
            if (!mb.dealerPersonalization.$valid) {
                setFormDirty(mb.dealerPersonalization);
                logger.warning('Please make sure all the fields are filled correctly.');
                return false;
            }
            localStorageService.set('getMBData', mb.getMBData);
            localStorageService.set('enrollmentSteps', 'Step2');
            $state.go('mercedesbenz.authorization');
        }
        function back() {
            localStorageService.set('enrollmentSteps', '');
            $state.go('mercedesbenz.listSelection');
        }
        //get Initial Form data
        function getInitalFormData() {
            if (angular.isDefined(mb.getMBData) && mb.getMBData !== null &&
                angular.isDefined(mb.getMBData.dealerDetails) &&
                mb.getMBData.dealerDetails !== null) {
                mb.getMBData.enrollmentDetails.DEALER_CODE = mb.getMBData.dealerDetails.DEALER_CODE;
            }
        }
        //...........................................
        //Generate Popup......................
        function generatePopup(message, headerMessage, enableButtons) { }
        //Set invalid formfields dirty
        function setFormDirty(form) {
            angular.forEach(form, function (obj) {
                if (angular.isDefined(obj) && obj.$dirty === false) {
                    obj.$setDirty();
                }
                if (angular.isDefined(obj) && obj.$touched === false) {
                    obj.$setTouched();
                }
            });
        }
        //.............................
        //Call init function.......
        init();
        //...........................
    }
})();
