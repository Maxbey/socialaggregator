'use strict';

describe('Controller: HeaderLoggedController', function () {

  // load the controller's module
  beforeEach(module('spaApp'));

  beforeEach(module('stateMock'));
  beforeEach(module('authenticationServiceMock'));

  var HeaderLoggedController,
    AuthenticationService,
    scope,
    $state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _AuthenticationService_) {
    scope = $rootScope.$new();
    $state = _$state_;

    AuthenticationService = _AuthenticationService_;

    HeaderLoggedController = $controller('HeaderLoggedController', {
      $scope: scope,
      AuthenticationService: _AuthenticationService_,
      $state: _$state_,
    });

  }));

  it('interface should be defined', function () {
    expect(HeaderLoggedController.logout).toBeDefined();
  });

  it('should attach username to scope', function () {
    expect(HeaderLoggedController.username).toBe('username');
  });

  it('should call logout and change state', function () {
    spyOn(AuthenticationService, 'logout').and.callThrough();
    $state.expectTransitionTo('enter.login');

    HeaderLoggedController.logout();
    expect(AuthenticationService.logout).toHaveBeenCalled();
  });

});
