(function () {
    'use strict';

    angular
        .module('ep.axis.offerPortal')
        .controller('materialDemoTemplate', Templates);

    Templates.$inject = ['$scope'];
    /*@ngInject*/
    function Templates($scope) {
        var vm = this;

        function activate() {
            console.log('Activated Material Demo');
        }

        vm.formModel = {
            dealer: {
                dealerName: 'Nissan Dealer America Nissan Dealer America Nissan Dealer America',
                address: '12346 MainSterrt Ave.',
                dealerCode: 'ABCDE123456XYZ',
                city: 'Chicago',
                state: 'Illinois',
                zipCode: '60606',
                website: 'www.NissanDealerChicago.com'
            },
            contacts: {
                contact1: {
                    firstName: 'Robert',
                    lastName: 'Smith',
                    phoneNumber: '123-456-7890',
                    email: 'Robert.Smith@nissan.com'
                },
                contact2: {
                    required: true,
                    firstName: 'Robert',
                    lastName: 'Smith',
                    phoneNumber: '123-456-7890',
                    email: 'Robert.Smith@nissan.com'
                },
                contact3: {
                    required: true,
                    firstName: 'Robert',
                    lastName: 'Smith',
                    phoneNumber: '123-456-7890',
                    email: 'Robert.Smith@nissan.com'
                }
            },
            contactsArray: [{
                    firstName: 'Robert',
                    lastName: 'Smith',
                    phone: '123-456-7890',
                    email: 'Robert.Smith@nissan.com'
                },
                {
                    firstName: 'John',
                    lastName: 'Adams',
                    phone: '123-456-7890',
                    email: 'John.Adams@nissan.com'
                },
                {
                    'firstName': 'Danielle',
                    'lastName': 'Hurst',
                    'email': 'daniellehurst@nissan.com',
                    'phone': '123-456-7890'
                },
                {
                    'firstName': 'Reid',
                    'lastName': 'Lyons',
                    'email': 'reidlyons@nissan.com',
                    'phone': '123-456-7890'
                }
            ]
        };

        vm.formFields = [{
                key: 'Card',
                id: 'Card',
                type: 'ep-card',
                className: 'profileCard',
                templateOptions: {
                    headerRequired: false,
                    headerAvatar: '',
                    headerTitle: '',
                    headerSubTitle: '',
                    cardImage: '',
                    titleRequired: true,
                    title: 'Dealer Profile',
                    subTitle: 'Review your dealership information and setup your contacts to ensure any relevant notifications are received.',
                    cardMedia: '<div class="md-media-sm"><img class="md-user-avatar"  src="images/Dealer_profile.png"></div>',
                    content: '',
                    actionsRequired: false,
                    footer: ''
                }
            },
            {
                className: 'layout-row content profile-content',
                fieldGroup: [{
                        key: 'dealer',
                        className: 'layout-gt-sm-row layout-padding layout-wrap dealerProfile',
                        fieldGroup: [{
                                key: 'dealerName',
                                id: 'dealerName',
                                type: 'ep-label',
                                className: 'flex-100 labelfield',
                                templateOptions: {
                                    className: 'dealer-name',
                                    label: 'Dealer Name',
                                    labelClass: 'disabledInputLabel'
                                }
                            },
                            {
                                key: 'address',
                                id: 'address',
                                type: 'ep-label',
                                className: 'flex-gt-sm-60 labelfield',
                                templateOptions: {
                                    label: 'Address'
                                }
                            },
                            {
                                key: 'dealerCode',
                                id: 'dealerCode',
                                type: 'ep-label',
                                className: 'flex-gt-sm-40 labelfield',
                                templateOptions: {
                                    label: 'Dealer Code'
                                }
                            },
                            {
                                key: 'city',
                                id: 'city',
                                type: 'ep-label',
                                className: 'flex-gt-sm-20 labelfield',
                                templateOptions: {
                                    label: 'City'
                                }
                            },
                            {
                                key: 'state',
                                id: 'state',
                                type: 'ep-label',
                                className: 'flex-gt-sm-20 labelfield',
                                templateOptions: {
                                    label: 'State'
                                }
                            },
                            {
                                key: 'zipCode',
                                id: 'zipCode',
                                type: 'ep-label',
                                className: 'flex-gt-sm-20 labelfield',
                                templateOptions: {
                                    label: 'Zip Code'
                                }
                            },
                            {
                                key: 'photo',
                                id: 'photo',
                                type: 'ep-fileupload',
                                className: 'flex-gt-sm-40 ',
                                templateOptions: {
                                    layoutClass:'layout-column',
                                    label: 'Upload your dealership photo',
                                    buttonText: 'Upload',
                                    placeHolder: 'Choose file..',
                                    required: true,
                                    uploadUrl: '/images',
                                    fileName: '',
                                    noTextbox: false,
                                    buttonClass: 'md-raised md-nissan',
                                    buttonLayout: 'layout-row layout-align-end-center'
                                }
                            },
                            {
                                key: 'website',
                                id: 'website',
                                type: 'ep-label',
                                className: 'flex-gt-sm-100 labelfield',
                                templateOptions: {
                                    label: 'Website'
                                }
                            }
                        ]
                    },
                    {
                        key: 'photo',
                        className: 'flex-sm-40',
                        template: '<div class="profile-picture"></div>'
                    }

                ]
            },
            {
                className: 'layout-column layout-wrap  content',
                fieldGroup: [{
                        className: ' margin-left-20 layout-row ',
                        template: '<div class="layout-row layout-align-start-center flex"><span class="dealer-heading">Dealer Contacts </span> <span>&nbsp;&nbsp;(Please add at least one contact)</span> </div><div class="flex layout-row layout-align-end-end"><md-button class="md-raised md-default">Add Contact</md-button></div>'
                    },
                    {
                        className: 'margin-left-20 flex-100',
                        template: '<div class=" flex-60"><span class="contacts-subhead">Enter the names of up to five employees you want to receive notifications regarding your </br>Dealer Custom Coupon Center account.</span></div>'
                    }, {
                        className:'layout-column inputFields',
                        fieldGroup: [{
                                key: 'contactsArray',
                                className:'flex-100',
                                template: '<div layout="row" layout-align="center center" class="header" layout-padding><div flex layout="row"><div flex layout="row" layout-align="start center">Send Notification</div><div flex layout="row" layout-align="start center">First Name</div><div flex layout="row" layout-align="start center">Last Name</div><div flex layout="row" layout-align="start center">Phone Number</div><div flex layout="row" layout-align="start center">Email</div><div flex layout="row" layout-align="center center">Edit Contact</div><div flex layout="row" layout-align="center center">Delete Contact</div></div></div><div class="nissan-demo" layout="column" ng-repeat="item in model[options.key]" layout-padding><div layout="row" layout-align="center center"><div flex><div layout="row" ><md-checkbox class="md-primary margin-left-20" aria-label="selected" color="primary"></md-checkbox></div></div><div flex layout="row" layout-align="start center">{{item.firstName}}</div><div flex layout="row" layout-align="start center">{{item.lastName}}</div><div flex layout="row" layout-align="start center">{{item.phone}}</div><div flex layout="row" layout-align="start center">{{item.email}}</div><div flex><div layout="row" layout-align="center center"><img width="32px" height="32px" src="/images/edit-icon.png"></div></div><div flex><div layout="row" layout-align="center center"><img width="15px" height="16px" src="/images/delete.png"></div></div></div><div  ><md-divider flex ></md-divider></div></div></div></div>'
                            },
                            {
                                className: 'layout-row layout-padding',
                                fieldGroup: [{
                                        key: 'firstName',
                                        id: 'contact1firstName',
                                        type: 'ep-text',
                                        className: 'flex dealer-contact-lbl',
                                        templateOptions: {
                                            placeholder: 'First Name',
                                            label: 'First Name',
                                            required: true
                                        },
                                        validation: {
                                            messages: {
                                                required: '\"First Name is required\"'
                                            }
                                        }
                                    },
                                    {
                                        key: 'lastName',
                                        id: 'contact1lastName',
                                        type: 'ep-text',
                                        className: 'flex dealer-contact-lbl',
                                        templateOptions: {
                                            placeholder: 'Last Name',
                                            label: 'Last Name',
                                            required: true
                                        },
                                        validation: {
                                            messages: {
                                                required: '\"Last Name is required\"'
                                            }
                                        }
                                    },
                                    {
                                        key: 'phone',
                                        id: 'contact1phoneNumber',
                                        type: 'ep-text',
                                        className: 'flex dealer-contact-lbl',
                                        templateOptions: {
                                            placeholder: 'Phone Number',
                                            label: 'Phone Number',
                                            required: true,
                                            validator: 'phone'
                                        },
                                        validation: {
                                            messages: {
                                                required: '\"Phone Number is required\"',
                                                pattern: '\"Invalid Phone Number: Format xxx-xxx-xxxx\"'
                                            }
                                        }
                                    },
                                    {
                                        key: 'email',
                                        id: 'contact1email',
                                        type: 'ep-text',
                                        className: 'flex dealer-contact-lbl',
                                        templateOptions: {
                                            placeholder: 'Email',
                                            label: 'Email',
                                            required: true,
                                            validator: 'email'
                                        },
                                        validation: {
                                            messages: {
                                                required: '\"Email is required\"',
                                                pattern: '\"Invalid Email\"'
                                            }
                                        }
                                    }
                                ]
                            },
                            
                        ]
                    },
                    {
                                className: 'layout-row  layout-align-end-center',
                                fieldGroup: [{
                                    key: 'cancel',
                                    id: 'cancel',
                                    type: 'ep-button',
                                    templateOptions: {
                                        class: 'md-raised md-default',
                                        title: 'Cancel',
                                        label: 'Cancel',
                                        onClick: 'formState.onClick(model)'
                                    }
                                }, {
                                    key: 'button',
                                    id: 'Button1',
                                    type: 'ep-button',
                                    templateOptions: {
                                        class: 'md-raised md-nissan',
                                        title: 'save',
                                        label: 'save'
                                    }
                                }]
                            }
                ]
            }
        ];
        vm.actualFormFields = angular.copy(vm.formFields);
        vm.options = {
            formState: {
                programName: 'Ford Campaigns',
                formName: 'Campaign Detail',
                onClick: function (data) {
                    alert('button clicked');
                }
            }
        };
        activate();
    }
})();