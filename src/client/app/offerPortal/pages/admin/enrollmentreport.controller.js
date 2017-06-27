(function () {
    'use strict';

    angular
        .module('ep.axis.offerPortal')
        .controller('enrollmentReportController', EnrollmentreportController);
    /*jshint maxparams:13*/
    EnrollmentreportController.$inject = ['$state', 'logger', '$http', '$epGenericDataService',
        '$stateParams', 'localStorageService', 'epOfferFcty', '$rootScope', 
         'epAxisSettingsVal'
    ];
    function EnrollmentreportController($state, logger, $http,
        $epGenericDataService, $stateParams, localStorageService, epOfferFcty, $rootScope,
          epAxisSettingsVal) {
        var cl = this;

        //................
        //Init call declaration...
        cl.init = function () {
            setFormlyOptions();
            getMBData();
            getFormlyFields();
        };
        //...............................
        //Login field defination.......
        function getFormlyFields() {
            $epGenericDataService.getForm(cl.options.formState.programName,
                cl.options.formState.formName)
                .$promise.then(function (data) {
                    cl.formlyFields = data;
                    cl.getMBData = localStorageService.get('getMBData');
                    if (angular.isDefined(cl.getMBData) && cl.getMBData === null) {
                        cl.getMBData = {};
                    }
                    cl.getMBData.headerFormFields = cl.formlyFields.headerImg;
                    localStorageService.set('getMBData', cl.getMBData);
                    //globalService.notifyObservers(localStorageService.get('getMBData'));
                });
        }
        //.............................................
        //Get CP data.................
        function getMBData() {
            cl.getMBData = localStorageService.get('getMBData');
            if (angular.isDefined(cl.getMBData) && cl.getMBData != null) {
                cl.userDetails =
                    cl.getMBData.userDetails;
                cl.dealerDetails =
                    cl.getMBData.dealerDetails;
                cl.options.formState.isDealer = cl.userDetails.USERROLE === 'Dealer';
            }
        }
        //.............................
        //Formly options........
        function setFormlyOptions() {
            cl.options = {
                formState: {
                    programName: $rootScope.oemDetails.programName,
                    formName: 'EnrollmentReport',
                    enroll: cl.enroll,
                    isDealer: true
                }
            };
        }
        //.....................................
        cl.resetCampaignEnrollment = function () {
            if (angular.isDefined(cl.getMBData) &&
             angular.isDefined(cl.getMBData.enrollmentDetails) &&
                cl.getMBData.enrollmentDetails !== null) {
                cl.getMBData.enrollmentDetails.campaignDetails =
                    cl.getMBData.enrollmentDetails.campaignEnrollmentDetails = undefined;
                localStorageService.set('getMBData', cl.getMBData);
            }
        };
        //..........................................
        //Enter click function.......
        cl.enroll = function () {
            cl.resetCampaignEnrollment();
            $state.go('mercedesbenz.listSelection');
        };
        //...................................
        //Call init function.......
        cl.init();
        //...........................
    }
})();
