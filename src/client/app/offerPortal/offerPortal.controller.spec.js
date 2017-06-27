/* jshint -W117, -W030 */
describe('We20', function() {
    var controller;
    beforeEach(function() {
        bard.appModule('ep.we20');
        bard.inject('$controller', '$q', '$rootScope');
    });
    beforeEach(function() {
        controller = $controller('We20');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    // describe('Web Enrollment 2.0 controller', function() {
    //     it('should be created successfully', function() {
    //         expect(controller).to.be.defined;
    //     });

    //     describe('after activate', function() {
    //         it('should have title of Web Enrollment 2.0', function() {
    //             expect(controller.title).to.equal('Web Enrollment 2.0');
    //         });
    //     });
    // });
    // describe('Web Enrollment 2.0 ActivityHistory controller', function() {
    //     var profileController, scope;
    //     beforeEach(function() {
    //         scope = $rootScope.$new();
    //         profileController = $controller('ActivityHistory', {$scope:scope});
    //     });
    //     it('should be created successfully', function() {
    //         expect(profileController).to.be.defined;
    //     });

    //     describe('after activate', function() {
    //         it('should have title of ActivityHistory', function() {
    //             expect(profileController.title).to.equal('ActivityHistory');
    //         });
    //     });
    // });
});
