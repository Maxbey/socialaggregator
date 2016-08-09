'use strict';

describe('Controller: ProfileCtrl', function () {

  // load the controller's module
  beforeEach(module('spaApp'));

  beforeEach(module('stateMock'));
  beforeEach(module('userServiceMock'));
  beforeEach(module('authenticationServiceMock'));

  var ProfileCtrl,
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

    ProfileCtrl = $controller('ProfileCtrl', {
      $scope: scope,
      AuthenticationService: _AuthenticationService_,
      UserService: _UserService_,
      ToastService: ToastServiceMock,
      $state: _$state_
    });

  }));

  it('interface should be defined', function () {
    expect(ProfileCtrl.update).toBeDefined();
  });

  it('should attach user data to scope', function () {
    expect(ProfileCtrl.user).toBeDefined();
  });

  it('should call UserService.update, reload state and show toast', function () {
    spyOn(UserService, 'update').and.callThrough();
    spyOn(ToastServiceMock, 'show').and.callThrough();
    spyOn($state, 'reload').and.callThrough();

    ProfileCtrl.update();

    expect(UserService.update).toHaveBeenCalled();
    expect(ToastServiceMock.show).toHaveBeenCalled();
    expect($state.reload).toHaveBeenCalled();
  });
});
