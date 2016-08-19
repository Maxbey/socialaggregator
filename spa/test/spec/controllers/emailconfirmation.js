'use strict';

describe('Controller: EmailConfirmationCtrl', function () {

  // load the controller's module
  beforeEach(module('spaApp'));

  beforeEach(module('authenticationServiceMock'));

  var EmailConfirmationCtrl,
    AuthenticationService,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _AuthenticationService_) {
    scope = $rootScope.$new();

    AuthenticationService = _AuthenticationService_;

    EmailConfirmationCtrl = $controller('EmailConfirmationCtrl', {
      $scope: scope,
      AuthenticationService: _AuthenticationService_,
      $stateParams: {key: 'confirmationkey'},
    });

  }));

  it('confirmation variable should be defined', function () {
    expect(EmailConfirmationCtrl.confirmation).toBeDefined();
  });
});
