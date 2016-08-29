'use strict';

describe('Controller: LoginController', function() {

  // load the controller's module
  beforeEach(module('spaApp'));

  beforeEach(module('stateMock'));
  beforeEach(module('formServiceMock'));
  beforeEach(module('responseServiceMock'));
  beforeEach(module('authenticationServiceMock'));

  var LoginController,
    AuthenticationService,
    FormService,
    ResponseService,
    ToastServiceMock,
    $authMock,
    scope,
    $state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _$state_, _AuthenticationService_, _FormService_, _ResponseService_) {
    scope = $rootScope.$new();
    $state = _$state_;

    AuthenticationService = _AuthenticationService_;
    FormService = _FormService_;
    ResponseService = _ResponseService_;

    ToastServiceMock = {
      show: function() {},
      error: function() {}
    };

    $authMock = {
      setToken: function() {}
    };

    LoginController = $controller('LoginController', {
      $scope: scope,
      $auth: $authMock,
      ToastService: ToastServiceMock,
      $state: _$state_
    });

  }));

  it('interface should be defined', function() {
    expect(LoginController.login).toBeDefined();
    expect(LoginController.socialLogin).toBeDefined();
  });

  it('login success case', function() {
    spyOn(AuthenticationService, 'login').and.callThrough();
    spyOn(ToastServiceMock, 'show').and.callThrough();
    spyOn($authMock, 'setToken').and.callThrough();
    $state.expectTransitionTo('app.dashboard');

    LoginController.login({});

    expect(AuthenticationService.login).toHaveBeenCalled();
    expect(ToastServiceMock.show)
      .toHaveBeenCalledWith('You are successfully logged in');
    expect($authMock.setToken).toHaveBeenCalled();
  });

  it('login error case', function() {
    AuthenticationService.response = false;
    spyOn(AuthenticationService, 'login').and.callThrough();
    spyOn(ToastServiceMock, 'error').and.callThrough();
    spyOn(ResponseService, 'parseResponseErrors').and.callThrough();
    spyOn(FormService, 'setServerValidation').and.callThrough();

    LoginController.login({});

    expect(AuthenticationService.login).toHaveBeenCalled();
    expect(ResponseService.parseResponseErrors).toHaveBeenCalled();
    expect(FormService.setServerValidation)
      .toHaveBeenCalledWith({},
        LoginController.backendValidationErrors,
        'serverValidation'
      );
      expect(ToastServiceMock.error)
        .toHaveBeenCalledWith('some non-field');
  });

  it('login error case, toast should not have been called', function() {
    AuthenticationService.response = false;
    AuthenticationService.specifyErrorData({});

    spyOn(AuthenticationService, 'login').and.callThrough();
    spyOn(ToastServiceMock, 'error').and.callThrough();

    LoginController.login({});

    expect(AuthenticationService.login).toHaveBeenCalled();
    expect(ToastServiceMock.error).not.toHaveBeenCalled();
  });

  it('social login success case', function() {
    spyOn(AuthenticationService, 'socialLogin').and.callThrough();
    spyOn(ToastServiceMock, 'show').and.callThrough();
    $state.expectTransitionTo('app.dashboard');

    LoginController.socialLogin('facebook');

    expect(AuthenticationService.socialLogin).toHaveBeenCalled();
    expect(ToastServiceMock.show)
      .toHaveBeenCalledWith('You are successfully logged in via facebook');
  });

  it('socialLogin error case', function() {
    AuthenticationService.response = false;
    AuthenticationService.specifyErrorData(['some error messsage']);

    spyOn(ToastServiceMock, 'error').and.callThrough();
    LoginController.socialLogin('github');
    expect(ToastServiceMock.error)
      .toHaveBeenCalledWith('some error messsage');
  });

  it('socialLogin error case, toast should not have been called', function() {
    AuthenticationService.response = false;
    AuthenticationService.specifyErrorData({});

    spyOn(ToastServiceMock, 'error').and.callThrough();
    LoginController.socialLogin('github');
    expect(ToastServiceMock.error).not.toHaveBeenCalled();
  });

  it('should call FormService.resetServerValidation', function() {
    spyOn(FormService, 'resetServerValidation').and.callThrough();

    LoginController.resetServerValidation({}, 'asd');

    expect(FormService.resetServerValidation)
      .toHaveBeenCalledWith({}, 'serverValidation');
  });

});
