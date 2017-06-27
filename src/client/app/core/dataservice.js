(function () {
    'use strict';

    angular
        .module('ep.axis.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$location', '$q', 'exception', 'logger', 'config'];
    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger, config) {
        var readyPromise;

        var service = {
            getCustomer: getCustomer,
            getCustomers: getCustomers,
            getCampEnrollRightFields: getCampEnrollRightFields,
            getCampEnrollLeftFields: getCampEnrollLeftFields,
            getCampEnrollDlrAttrFields:getCampEnrollDlrAttrFields,
            getCountryData: getCountryData,
            getCampaignListFields: getCampaignListFields,
            getCampaignListData: getCampaignListData,
            getCampaignEnrollData:getCampaignEnrollData,
            ready: ready
        };

        return service;

        function getCustomer(id) {
            return $http.get('/api/customer/' + id)
                .then(getCustomerComplete)
                .catch(function (message) {
                    exception.catcher('XHR Failed for getCustomer')(message);
                    $location.url('/');
                });

            function getCustomerComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getCustomers() {
            return $http.get('/api/customers')
                .then(getCustomersComplete)
                .catch(function (message) {
                    exception.catcher('XHR Failed for getCustomers')(message);
                    $location.url('/');
                });

            function getCustomersComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getCampEnrollRightFields() {
            return $http.get('/api/campEnrollRightFields')
                .then(getCampEnrollRightFieldsComplete)
                .catch(function (message) {
                    exception.catcher('XHR Failed for getCampEnrollRightFields')(message);
                    $location.url('/');
                });

            function getCampEnrollRightFieldsComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getCampEnrollLeftFields() {
            return $http.get('/api/campEnrollLeftFields')
                .then(getCampEnrollLeftFieldsComplete)
                .catch(function (message) {
                    exception.catcher('XHR Failed for getCampEnrollLeftFields')(message);
                    $location.url('/');
                });

            function getCampEnrollLeftFieldsComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getCampEnrollDlrAttrFields() {
            return $http.get('/api/campEnrollDlrAttrFields')
                .then(getCampEnrollDlrAttrFieldsComplete)
                .catch(function (message) {
                    exception.catcher('XHR Failed for getCampEnrollDlrAttrFields')(message);
                    $location.url('/');
                });

            function getCampEnrollDlrAttrFieldsComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getCampaignListFields() {
            return $http.get('/api/campaignListFields')
               .then(getgetCampaignListFieldsComplete)
                .catch(function (message) {
                    exception.catcher('XHR Failed for campaignListFieldsComplete')(message);
                    $location.url('/');
                });

            function getgetCampaignListFieldsComplete(data, status, headers, config) {
                return data.data;
            }
        }

        //Api to get country data....
        function getCountryData() {
            return $http.post(config.apiUrl +
                '/FormInitData/FORD CAMPAIGNS/Campaign Detail/Country')
                .then(getCountryDataComplete)
                .catch(function (message) {
                    exception.catcher('XHR Failed for getCountryDataComplete')(message);
                    $location.url('/');
                });

            function getCountryDataComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getCampaignListData() {
            return $http.post(config.apiUrl +
                '/FormGetData/FORD CAMPAIGNS/select campaigns')
                .then(getCampaignListDataComplete)
                .catch(function (message) {
                    exception.catcher('XHR Failed for getCampaignListDataComplete')(message);
                    $location.url('/');
                });

            function getCampaignListDataComplete(data, status, headers, config) {
                return data.data;
            }
        }
        function getCampaignEnrollData() {
            return $http.post(config.apiUrl + '/FormGetData/FORD CAMPAIGNS/Campaign Detail')
                .then(getCampaignEnrollDataComplete)
                .catch(function (message) {
                    exception.catcher('XHR Failed for getCampaignEnrollDataComplete')(message);
                    $location.url('/');
                });

            function getCampaignEnrollDataComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getReady() {
            if (!readyPromise) {
                // Apps often pre-fetch session data ("prime the app")
                // before showing the first view.
                // This app doesn't need priming but we add a
                // no-op implementation to show how it would work.
                readyPromise = $q.when(service);
            }
            return readyPromise;
        }

        function ready(promisesArray) {
            return getReady()
                .then(function () {
                    return promisesArray ? $q.all(promisesArray) : readyPromise;
                })
                .catch(exception.catcher('"ready" function failed'));
        }
    }
})();
