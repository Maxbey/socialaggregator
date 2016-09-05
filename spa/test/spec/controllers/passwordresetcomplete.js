'use strict';

describe('Controller: PasswordResetCompleteController', function() {

  // load the controller's module
  beforeEach(module('spaApp'));

  beforeEach(module('authenticationServiceMock'));
  beforeEach(module('responseServiceMock'));
  beforeEach(module('formServiceMock'));
  beforeEach(module('stateMock'));

  var PasswordResetCompleteController,
    AuthenticationService,
    FormService,
    ResponseService,
    ToastService,
    scope,
    $state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _AuthenticationService_, _$state_, _FormService_, _ResponseService_) {
    scope = $rootScope.$new();
    AuthenticationService = _AuthenticationService_;
    FormService = _FormService_;
    ResponseService = _ResponseService_;
    $state = _$state_;

    ToastService = {
      show: function() {}
    };

    PasswordResetCompleteController = $controller('PasswordResetCompleteController', {
      $scope: scope,
      AuthenticationService: _AuthenticationService_,
      $state: _$state_,
      ToastService: ToastService
    });

  }));

  it('interface should be defined', function() {
    expect(PasswordResetCompleteController.complete).toBeDefined();
    expect(PasswordResetCompleteController.resetServerValidation).toBeDefined();
    expect(PasswordResetCompleteController.backendValidationErrors).toBeDefined();
  });

  it('should call FormService.resetServerValidation', function() {
    spyOn(FormService, 'resetServerValidation').and.callThrough();

    PasswordResetCompleteController.resetServerValidation({});

    expect(FormService.resetServerValidation)
      .toHaveBeenCalledWith({}, 'serverValidation');
  });

  it('complete success test case', function() {
    spyOn(ToastService, 'show').and.callThrough();
    $state.expectTransitionTo('enter.login');

    PasswordResetCompleteController.complete({});

    expect(ToastService.show)
      .toHaveBeenCalledWith('Password has been successfully changed');
  });

  it('complete fail test case', function() {
    AuthenticationService.response = false;
    spyOn(ToastService, 'show').and.callThrough();
    spyOn(ResponseService, 'parseResponseErrors').and.callThrough();
    spyOn(FormService, 'setServerValidation').and.callThrough();

    PasswordResetCompleteController.complete({});
    expect(ResponseService.parseResponseErrors).toHaveBeenCalled();

    expect(FormService.setServerValidation)
      .toHaveBeenCalledWith({},
        PasswordResetCompleteController.backendValidationErrors,
        'serverValidation'
      );
    expect(ToastService.show)
      .toHaveBeenCalledWith('Incorrect link to reset password');
  });

  it('complete fail test case, should not show toast', function() {
    spyOn(ToastService, 'show').and.callThrough();

    AuthenticationService.response = false;
    AuthenticationService.specifyErrorData({});

    PasswordResetCompleteController.complete({});

    expect(ToastService.show).not.toHaveBeenCalled();

  });

});
