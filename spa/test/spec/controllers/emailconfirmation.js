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
      $stateParams: {key: 'confirmationkey'}
    });

  }));

  it('confirmEmail success test case', function () {
    spyOn(AuthenticationService, 'confirmEmail').and.callThrough();
    EmailConfirmationCtrl.confirmEmail();

    expect(EmailConfirmationCtrl.confirmation).toBe(true);
    expect(AuthenticationService.confirmEmail).toHaveBeenCalled();
  });

  it('confirmEmail fail test case', function () {
    AuthenticationService.response = false;
    spyOn(AuthenticationService, 'confirmEmail').and.callThrough();
    EmailConfirmationCtrl.confirmEmail();

    expect(EmailConfirmationCtrl.confirmation).toBe(false);
    expect(AuthenticationService.confirmEmail).toHaveBeenCalled();
  });
});
