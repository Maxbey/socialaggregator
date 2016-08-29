'use strict';

describe('Controller: RegisterController', function () {

  // load the controller's module
  beforeEach(module('spaApp'));

  beforeEach(module('authenticationServiceMock'));
  beforeEach(module('formServiceMock'));
  beforeEach(module('responseServiceMock'));
  beforeEach(module('stateMock'));

  var RegisterController,
    AuthenticationService,
    FormService,
    ToastService,
    ResponseService,
    scope,
    $state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _AuthenticationService_, _$state_, _FormService_, _ResponseService_) {
    scope = $rootScope.$new();
    AuthenticationService = _AuthenticationService_;
    FormService = _FormService_;
    ResponseService = _ResponseService_;
    $state = _$state_;

    ToastService = {show: function(){}};

    RegisterController = $controller('RegisterController', {
      $scope: scope,
      AuthenticationService: _AuthenticationService_,
      ToastService: ToastService,
      $state: _$state_
    });

  }));

  it('interface should be defined', function () {
    expect(RegisterController.register).toBeDefined();
    expect(RegisterController.resetServerValidation).toBeDefined();
  });

  it('register success test case', function () {
    spyOn(AuthenticationService, 'register').and.callThrough();
    spyOn(ToastService, 'show').and.callThrough();
    $state.expectTransitionTo('enter.login');

    RegisterController.register({});

    expect(AuthenticationService.register).toHaveBeenCalled();
    expect(ToastService.show)
      .toHaveBeenCalledWith('You are successfully registered');
  });

  it('register fail test case', function () {
    AuthenticationService.response = false;
    spyOn(ResponseService, 'parseResponseErrors').and.callThrough();
    spyOn(FormService, 'setServerValidation').and.callThrough();

    RegisterController.register({});

    expect(ResponseService.parseResponseErrors).toHaveBeenCalled();
    expect(FormService.setServerValidation)
      .toHaveBeenCalledWith({},
        RegisterController.backendValidationErrors,
        'serverValidation'
      );
  });

  it('should call FormService.resetServerValidation', function() {
    spyOn(FormService, 'resetServerValidation').and.callThrough();

    RegisterController.resetServerValidation({}, 'asd');

    expect(FormService.resetServerValidation)
      .toHaveBeenCalledWith({}, 'serverValidation');
  });

});
