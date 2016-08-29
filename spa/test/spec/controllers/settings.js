'use strict';

describe('Controller: SettingsController', function() {

  // load the controller's module
  beforeEach(module('spaApp'));

  beforeEach(module('stateMock'));
  beforeEach(module('userServiceMock'));
  beforeEach(module('responseServiceMock'));
  beforeEach(module('formServiceMock'));
  beforeEach(module('authenticationServiceMock'));

  var SettingsController,
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

    SettingsController = $controller('SettingsController', {
      $scope: scope,
      UserService: _UserService_,
      ToastService: ToastServiceMock,
      $state: _$state_
    });

  }));

  it('interface should be defined', function() {
    expect(SettingsController.updateProfile).toBeDefined();
    expect(SettingsController.changePassword).toBeDefined();
    expect(SettingsController.resetServerValidation).toBeDefined();
  });

  it('should attach user data to scope', function() {
    expect(SettingsController.user).toBeDefined();
  });

  it('updateProfile success test case', function() {
    spyOn(UserService, 'update').and.callThrough();
    spyOn(ToastServiceMock, 'show').and.callThrough();

    SettingsController.updateProfile();

    expect(UserService.update).toHaveBeenCalled();
    expect(ToastServiceMock.show).toHaveBeenCalled();
  });

  it('updateProfile fail test case', function() {
    UserService.response = false;
    spyOn(UserService, 'update').and.callThrough();
    spyOn(ResponseService, 'parseResponseErrors').and.callThrough();
    spyOn(FormService, 'setServerValidation').and.callThrough();


    SettingsController.updateProfile({});
    expect(UserService.update).toHaveBeenCalled();
    expect(ResponseService.parseResponseErrors).toHaveBeenCalled();
    expect(FormService.setServerValidation)
      .toHaveBeenCalledWith({},
        SettingsController.backendValidationErrors,
        'serverValidation'
      );
  });

  it('changePassword success test case', function() {
    spyOn(AuthenticationService, 'changePassword').and.callThrough();
    spyOn(ToastServiceMock, 'show').and.callThrough();

    SettingsController.changePassword({});
    expect(ToastServiceMock.show).toHaveBeenCalled();
    expect(AuthenticationService.changePassword)
      .toHaveBeenCalledWith(SettingsController.credentials);
  });

  it('changePassword fail test case', function() {
    AuthenticationService.specifyResponseType(false);
    spyOn(AuthenticationService, 'changePassword').and.callThrough();
    spyOn(ResponseService, 'parseResponseErrors').and.callThrough();
    spyOn(FormService, 'setServerValidation').and.callThrough();


    SettingsController.changePassword({});

    expect(AuthenticationService.changePassword)
      .toHaveBeenCalledWith(SettingsController.credentials);

    expect(ResponseService.parseResponseErrors).toHaveBeenCalled();
    expect(FormService.setServerValidation)
      .toHaveBeenCalledWith({},
        SettingsController.backendValidationErrors,
        'serverValidation'
      );
  });

  it('should call FormService.resetServerValidation', function() {
    spyOn(FormService, 'resetServerValidation').and.callThrough();

    SettingsController.resetServerValidation({});

    expect(FormService.resetServerValidation)
      .toHaveBeenCalledWith({}, 'serverValidation');
  });
});
