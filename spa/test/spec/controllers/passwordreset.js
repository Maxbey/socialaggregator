'use strict';

describe('Controller: PasswordResetCtrl', function() {

  // load the controller's module
  beforeEach(module('spaApp'));

  beforeEach(module('authenticationServiceMock'));
  beforeEach(module('stateMock'));

  var PasswordResetCtrl,
    AuthenticationService,
    ToastService,
    scope,
    $state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _AuthenticationService_, _$state_) {
    scope = $rootScope.$new();
    AuthenticationService = _AuthenticationService_;
    $state = _$state_;

    ToastService = {
      show: function() {}
    };

    PasswordResetCtrl = $controller('PasswordResetCtrl', {
      $scope: scope,
      AuthenticationService: _AuthenticationService_,
      $state: _$state_,
      ToastService: ToastService
    });

  }));

  it('interface should be defined', function() {
    expect(PasswordResetCtrl.reset).toBeDefined();
  });

  it('should call AuthenticationService.resetPassword and show toast', function() {
    spyOn(AuthenticationService, 'resetPassword').and.callThrough();
    spyOn(ToastService, 'show').and.callThrough();

    PasswordResetCtrl.reset('someemail');

    expect(AuthenticationService.resetPassword)
      .toHaveBeenCalledWith('someemail');
    expect(ToastService.show)
      .toHaveBeenCalledWith('Email with instructions has been sent');

  });

});
