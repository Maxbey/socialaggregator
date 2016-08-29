'use strict';

describe('Controller: LoginCtrl', function() {

  // load the controller's module
  beforeEach(module('spaApp'));

  beforeEach(module('stateMock'));
  beforeEach(module('formServiceMock'));
  beforeEach(module('responseServiceMock'));
  beforeEach(module('authenticationServiceMock'));

  var LoginCtrl,
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

    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      $auth: $authMock,
      ToastService: ToastServiceMock,
      $state: _$state_
    });

  }));

  it('interface should be defined', function() {
    expect(LoginCtrl.login).toBeDefined();
    expect(LoginCtrl.socialLogin).toBeDefined();
  });

  it('login success case', function() {
    spyOn(AuthenticationService, 'login').and.callThrough();
    spyOn(ToastServiceMock, 'show').and.callThrough();
    spyOn($authMock, 'setToken').and.callThrough();
    $state.expectTransitionTo('app.dashboard');

    LoginCtrl.login({});

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

    LoginCtrl.login({});

    expect(AuthenticationService.login).toHaveBeenCalled();
    expect(ResponseService.parseResponseErrors).toHaveBeenCalled();
    expect(FormService.setServerValidation)
      .toHaveBeenCalledWith({},
        LoginCtrl.backendValidationErrors,
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

    LoginCtrl.login({});

    expect(AuthenticationService.login).toHaveBeenCalled();
    expect(ToastServiceMock.error).not.toHaveBeenCalled();
  });

  it('social login success case', function() {
    spyOn(AuthenticationService, 'socialLogin').and.callThrough();
    spyOn(ToastServiceMock, 'show').and.callThrough();
    $state.expectTransitionTo('app.dashboard');

    LoginCtrl.socialLogin('facebook');

    expect(AuthenticationService.socialLogin).toHaveBeenCalled();
    expect(ToastServiceMock.show)
      .toHaveBeenCalledWith('You are successfully logged in via facebook');
  });

  it('socialLogin error case', function() {
    AuthenticationService.response = false;
    AuthenticationService.specifyErrorData(['some error messsage']);

    spyOn(ToastServiceMock, 'error').and.callThrough();
    LoginCtrl.socialLogin('github');
    expect(ToastServiceMock.error)
      .toHaveBeenCalledWith('some error messsage');
  });

  it('socialLogin error case, toast should not have been called', function() {
    AuthenticationService.response = false;
    AuthenticationService.specifyErrorData({});

    spyOn(ToastServiceMock, 'error').and.callThrough();
    LoginCtrl.socialLogin('github');
    expect(ToastServiceMock.error).not.toHaveBeenCalled();
  });

  it('should call FormService.resetServerValidation', function() {
    spyOn(FormService, 'resetServerValidation').and.callThrough();

    LoginCtrl.resetServerValidation({}, 'asd');

    expect(FormService.resetServerValidation)
      .toHaveBeenCalledWith({}, 'serverValidation');
  });

});
