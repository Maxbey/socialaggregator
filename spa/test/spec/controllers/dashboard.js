'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('spaApp'));
  beforeEach(module('userServiceMock'));

  var DashboardCtrl,
    UserService,
    scope,
    $state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _UserService_) {
    scope = $rootScope.$new();
    $state = _$state_;

    UserService = _UserService_;

    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope,
      UserService: _UserService_
    });

  }));

  it('should attach persons to scope', function () {
    expect(DashboardCtrl.persons).toBeDefined();
  });

});
