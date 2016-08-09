'use strict';

describe('Controller: RegisterCtrl', function () {

  // load the controller's module
  beforeEach(module('spaApp'));

  beforeEach(module('authenticationServiceMock'));

  var RegisterCtrl,
    AuthenticationService,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _AuthenticationService_) {
    scope = $rootScope.$new();
    AuthenticationService = _AuthenticationService_;

    RegisterCtrl = $controller('RegisterCtrl', {
      $scope: scope,
      AuthenticationService: _AuthenticationService_
    });

  }));

  it('interface should be defined', function () {
    expect(RegisterCtrl.register).toBeDefined();
  });

  it('should call AuthenticationService.register', function () {
    spyOn(AuthenticationService, 'register').and.callThrough();

    RegisterCtrl.register();

    expect(AuthenticationService.register).toHaveBeenCalled();
  });

});
