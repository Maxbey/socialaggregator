'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('spaApp'));

  beforeEach(module('stateMock'));
  beforeEach(module('authenticationServiceMock'));

  var LoginCtrl,
    AuthenticationService,
    ToastServiceMock,
    $authMock,
    scope,
    $state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _AuthenticationService_) {
    scope = $rootScope.$new();
    $state = _$state_;
    AuthenticationService = _AuthenticationService_;

    ToastServiceMock = {
      show: function () {
      },
      error: function(){}
    };

    $authMock = {
      setToken: function () {
      }
    };

    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      AuthenticationService: _AuthenticationService_,
      $auth: $authMock,
      ToastService: ToastServiceMock,
      $state: _$state_
    });

  }));

  it('interface should be defined', function () {
    expect(LoginCtrl.login).toBeDefined();
    expect(LoginCtrl.socialLogin).toBeDefined();
  });

  it('login success case', function () {
    spyOn(AuthenticationService, 'login').and.callThrough();
    spyOn(ToastServiceMock, 'show').and.callThrough();
    spyOn($authMock, 'setToken').and.callThrough();
    $state.expectTransitionTo('app.dashboard');

    LoginCtrl.login('email', 'pass');

    expect(AuthenticationService.login).toHaveBeenCalled();
    expect(ToastServiceMock.show).toHaveBeenCalled();
    expect($authMock.setToken).toHaveBeenCalled();
  });

  it('social login success case', function () {
    spyOn(AuthenticationService, 'socialLogin').and.callThrough();
    spyOn(ToastServiceMock, 'show').and.callThrough();
    $state.expectTransitionTo('app.dashboard');

    LoginCtrl.socialLogin('facebook');

    expect(AuthenticationService.socialLogin).toHaveBeenCalled();
    expect(ToastServiceMock.show).toHaveBeenCalled();
  });

  it('socialLogin error case', function(){
    AuthenticationService.response = false;

    spyOn(ToastServiceMock, 'error').and.callThrough();
    LoginCtrl.socialLogin('github');
    expect(ToastServiceMock.error).toHaveBeenCalled();
  });

});
