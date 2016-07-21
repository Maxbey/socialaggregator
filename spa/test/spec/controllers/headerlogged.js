'use strict';

describe('Controller: HeaderloggedCtrl', function () {

  // load the controller's module
  beforeEach(module('spaApp'));

  var HeaderloggedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HeaderloggedCtrl = $controller('HeaderloggedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HeaderloggedCtrl.awesomeThings.length).toBe(3);
  });
});
