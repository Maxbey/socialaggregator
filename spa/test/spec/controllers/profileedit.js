'use strict';

describe('Controller: ProfileeditCtrl', function () {

  // load the controller's module
  beforeEach(module('spaApp'));

  var ProfileeditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileeditCtrl = $controller('ProfileeditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProfileeditCtrl.awesomeThings.length).toBe(3);
  });
});
