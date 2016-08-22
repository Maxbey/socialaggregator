'use strict';

describe('Controller: SettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('spaApp'));

  beforeEach(module('stateMock'));
  beforeEach(module('userServiceMock'));
  beforeEach(module('authenticationServiceMock'));

  var SettingsCtrl,
    AuthenticationService,
    UserService,
    ToastServiceMock,
    scope,
    $state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$state_, _AuthenticationService_, _UserService_) {
    scope = $rootScope.$new();
    $state = _$state_;
    AuthenticationService = _AuthenticationService_;
    UserService = _UserService_;

    ToastServiceMock = {
      show: function () {
      }
    };

    SettingsCtrl = $controller('SettingsCtrl', {
      $scope: scope,
      AuthenticationService: _AuthenticationService_,
      UserService: _UserService_,
      ToastService: ToastServiceMock,
      $state: _$state_
    });

  }));

  it('interface should be defined', function () {
    expect(SettingsCtrl.updateProfile).toBeDefined();
    expect(SettingsCtrl.changePassword).toBeDefined();
  });

  it('should attach user data to scope', function () {
    expect(SettingsCtrl.user).toBeDefined();
  });

  it('should call UserService.update and show toast', function () {
    spyOn(UserService, 'update').and.callThrough();
    spyOn(ToastServiceMock, 'show').and.callThrough();

    SettingsCtrl.updateProfile();

    expect(UserService.update).toHaveBeenCalled();
    expect(ToastServiceMock.show).toHaveBeenCalled();
  });

  it('should call AuthenticationService.changePassword', function () {
    spyOn(AuthenticationService, 'changePassword').and.callThrough();

    SettingsCtrl.changePassword();
    expect(AuthenticationService.changePassword).toHaveBeenCalled();
  });
});
