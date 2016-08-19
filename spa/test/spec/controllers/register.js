'use strict';

describe('Controller: RegisterCtrl', function () {

  // load the controller's module
  beforeEach(module('spaApp'));

  beforeEach(module('authenticationServiceMock'));
  beforeEach(module('stateMock'));

  var RegisterCtrl,
    AuthenticationService,
    scope,
    $state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _AuthenticationService_, _$state_) {
    scope = $rootScope.$new();
    AuthenticationService = _AuthenticationService_;
    $state = _$state_;

    RegisterCtrl = $controller('RegisterCtrl', {
      $scope: scope,
      AuthenticationService: _AuthenticationService_,
      $state: _$state_
    });

  }));

  it('interface should be defined', function () {
    expect(RegisterCtrl.register).toBeDefined();
  });

  it('should call AuthenticationService.register', function () {
    spyOn(AuthenticationService, 'register').and.callThrough();
    $state.expectTransitionTo('enter.login');

    RegisterCtrl.register();

    expect(AuthenticationService.register).toHaveBeenCalled();
  });

});
