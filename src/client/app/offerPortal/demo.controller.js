(function () {
    'use strict';

    angular
        .module('ep.axis.offerPortal')
        .controller('demoController', DemoController);

    DemoController.$inject = ['$state', 'logger', '$rootScope',
        '$epGenericDataService', '$http'
    ];

    function DemoController($state, logger, $rootScope, $epGenericDataService, $http) {
        var vm = this;
        vm.submit = function (data) {
            if (vm.myform.$invalid) {
                angular.forEach(vm.myform.$error, function (field) {
                    angular.forEach(field, function (errorField) {
                        errorField.$setTouched();
                    });
                });
            }
            console.log(data);
            console.log(vm.myForm);
        };

        vm.formModel = {
            phone: '998-458-1245',
            email: 'test@test.com',
            notifications: true,
            switchNotifications: true,
            selectedUser: 2
        };

        vm.userFields = [{
                key: 'phone',
                id: 'phone',
                type: 'ep-text',
                templateOptions: {
                    label: 'Phone',
                    required: true,
                    maxlength: 30,
                    minlength: 10,
                    validator:'phone'
                },
                validation: {
                    messages: {
                        required: '\"Phone is required\"',
                        pattern: '\"Invalid Phone Expected Format : xxx-xxx-xxxx\"',
                        'md-maxlength': '\"Max length is reached\"',
                        minlength: '\"Minimim Characters Required\"'
                    }
                }
            },
            {
                key: 'email',
                id: 'email',
                type: 'ep-text',
                templateOptions: {
                    label: 'Email',
                    required: true,
                    maxlength: 60,
                    minlength: 3,
                    validator:'custom',
                    pattern: '^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'
                },
                validation: {
                    messages: {
                        required: '\"Email is required\"',
                        pattern: '\"Invalid Email - Expected Format : xxx@xxx.xxx\"',
                        'md-maxlength': '\"Max length is reached\"',
                        minlength: '\"Minimum Characters Required\"'
                    }
                }
            },
            {
                key: 'notifications',
                id: 'notifications',
                type: 'ep-checkbox',
                templateOptions: {
                    label: 'Notifications',
                    required: true,
                    className: 'md-primary'
                },
                validation: {
                    messages: {
                        required: 'Notifications is required'
                    }
                }
            },
            {
                key: 'isWarning',
                id: 'isWarning',
                type: 'ep-checkbox',
                templateOptions: {
                    label: 'is Warning?',
                    required: true,
                    ngTrueValue: '\'Yes\'',
                    ngFalseValue: '\'No\'',
                    className: 'md-warn'
                },
                validation: {
                    messages: {
                        required: 'Notifications is required'
                    }
                }
            },
            {
                key: 'switchNotifications',
                id: 'notifications',
                type: 'ep-switch',
                templateOptions: {
                    label: 'Notifications',
                    required: true,
                    className: 'md-primary'
                },
                validation: {
                    messages: {
                        required: 'Notifications is required'
                    }
                }
            },
            {
                key: 'switchIsWarning',
                id: 'isWarning',
                type: 'ep-switch',
                templateOptions: {
                    label: 'is Warning ?',
                    required: true,
                    ngTrueValue: '\'Yes\'',
                    ngFalseValue: '\'No\'',
                    className: 'md-warn'
                },
                validation: {
                    messages: {
                        required: 'Notifications is required'
                    }
                }
            },
            {
                key: 'Description',
                id: 'Description',
                type: 'ep-textarea',
                className: 'col-md-12',
                templateOptions: {
                    label: 'Description',
                    required: true,
                    maxlength: 300,
                    minlength: 10,
                    rows: 3
                },
                validation: {
                    messages: {
                        required: '\"Description is required\"',
                        'md-maxlength': '\"Max length is reached\"',
                        minlength: '\"Minimum Characters Required\"'
                    }
                }
            },
            {
                key: 'selectedUser',
                type: 'ep-dropdown',
                id: 'Employee',
                templateOptions: {
                    label: 'Employee',
                    options: [],
                    required: true,
                    valueProp: 'id',
                    labelProp: 'name',
                    ngChange: 'formState.onChange',
                    multiple: true,
                    defaultRequired: true
                },
                expressionProperties: {
                    'templateOptions.options': 'formState.employeeOptions'
                },
                validation: {
                    messages: {
                        required: '\"Employee is required\"'
                    }
                }
            }
        ];
        vm.actualFormFields = angular.copy(vm.userFields);
        vm.options = {
            formState: {
                programName: 'Ford Campaigns',
                formName: 'Campaign Detail',
                employeeOptions: [{
                        id: 1,
                        name: 'Bob'
                    },
                    {
                        id: 2,
                        name: 'Alice'
                    },
                    {
                        id: 3,
                        name: 'Steve'
                    }
                ],
                onChange: function () {
                    console.log('dropdown changed');
                }
            }
        };

        activate();

        function activate() {
            console.log('Activated Textbox');
        }
    }
})();
