'use strict';

describe('Controller: SettingsCtrl', function() {

  // load the controller's module
  beforeEach(module('spaApp'));

  beforeEach(module('stateMock'));
  beforeEach(module('userServiceMock'));
  beforeEach(module('responseServiceMock'));
  beforeEach(module('formServiceMock'));
  beforeEach(module('authenticationServiceMock'));

  var SettingsCtrl,
    AuthenticationService,
    FormService,
    ResponseService,
    UserService,
    ToastServiceMock,
    scope,
    $state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _$state_, _AuthenticationService_, _UserService_, _FormService_, _ResponseService_) {
    scope = $rootScope.$new();
    $state = _$state_;
    AuthenticationService = _AuthenticationService_;
    UserService = _UserService_;
    FormService = _FormService_;
    ResponseService = _ResponseService_;

    ToastServiceMock = {
      show: function() {}
    };

    SettingsCtrl = $controller('SettingsCtrl', {
      $scope: scope,
      UserService: _UserService_,
      ToastService: ToastServiceMock,
      $state: _$state_
    });

  }));

  it('interface should be defined', function() {
    expect(SettingsCtrl.updateProfile).toBeDefined();
    expect(SettingsCtrl.changePassword).toBeDefined();
    expect(SettingsCtrl.resetServerValidation).toBeDefined();
  });

  it('should attach user data to scope', function() {
    expect(SettingsCtrl.user).toBeDefined();
  });

  it('updateProfile success test case', function() {
    spyOn(UserService, 'update').and.callThrough();
    spyOn(ToastServiceMock, 'show').and.callThrough();

    SettingsCtrl.updateProfile();

    expect(UserService.update).toHaveBeenCalled();
    expect(ToastServiceMock.show).toHaveBeenCalled();
  });

  it('updateProfile fail test case', function() {
    UserService.response = false;
    spyOn(UserService, 'update').and.callThrough();
    spyOn(ResponseService, 'parseResponseErrors').and.callThrough();
    spyOn(FormService, 'setServerValidation').and.callThrough();


    SettingsCtrl.updateProfile({});
    expect(UserService.update).toHaveBeenCalled();
    expect(ResponseService.parseResponseErrors).toHaveBeenCalled();
    expect(FormService.setServerValidation)
      .toHaveBeenCalledWith({},
        SettingsCtrl.backendValidationErrors,
        'serverValidation'
      );
  });

  it('changePassword success test case', function() {
    spyOn(AuthenticationService, 'changePassword').and.callThrough();
    spyOn(ToastServiceMock, 'show').and.callThrough();

    SettingsCtrl.changePassword({});
    expect(ToastServiceMock.show).toHaveBeenCalled();
    expect(AuthenticationService.changePassword)
      .toHaveBeenCalledWith(SettingsCtrl.credentials);
  });

  it('changePassword fail test case', function() {
    AuthenticationService.specifyResponseType(false);
    spyOn(AuthenticationService, 'changePassword').and.callThrough();
    spyOn(ResponseService, 'parseResponseErrors').and.callThrough();
    spyOn(FormService, 'setServerValidation').and.callThrough();


    SettingsCtrl.changePassword({});

    expect(AuthenticationService.changePassword)
      .toHaveBeenCalledWith(SettingsCtrl.credentials);

    expect(ResponseService.parseResponseErrors).toHaveBeenCalled();
    expect(FormService.setServerValidation)
      .toHaveBeenCalledWith({},
        SettingsCtrl.backendValidationErrors,
        'serverValidation'
      );
  });

  it('should call FormService.resetServerValidation', function() {
    spyOn(FormService, 'resetServerValidation').and.callThrough();

    SettingsCtrl.resetServerValidation({});

    expect(FormService.resetServerValidation)
      .toHaveBeenCalledWith({}, 'serverValidation');
  });
});
