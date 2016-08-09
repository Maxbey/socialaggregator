'use strict';

describe('Controller: HeaderLoggedCtrl', function () {

  // load the controller's module
  beforeEach(module('spaApp'));

  beforeEach(module('stateMock'));
  beforeEach(module('authenticationServiceMock'));

  var HeaderLoggedCtrl,
    AuthenticationService,
    scope,
    $state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _AuthenticationService_) {
    scope = $rootScope.$new();
    $state = _$state_;

    AuthenticationService = _AuthenticationService_;

    HeaderLoggedCtrl = $controller('HeaderLoggedCtrl', {
      $scope: scope,
      AuthenticationService: _AuthenticationService_,
      $state: _$state_,
    });

  }));

  it('interface should be defined', function () {
    expect(HeaderLoggedCtrl.logout).toBeDefined();
  });

  it('should attach username to scope', function () {
    expect(HeaderLoggedCtrl.username).toBe('username');
  });

  it('should call logout and change state', function () {
    spyOn(AuthenticationService, 'logout').and.callThrough();
    $state.expectTransitionTo('enter.login');

    HeaderLoggedCtrl.logout();
    expect(AuthenticationService.logout).toHaveBeenCalled();
  });

});
