'use strict';

describe('Controller: EmailConfirmationController', function () {

  // load the controller's module
  beforeEach(module('socialAggregator'));

  beforeEach(module('authenticationServiceMock'));

  var EmailConfirmationController,
    AuthenticationService,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _AuthenticationService_) {
    scope = $rootScope.$new();

    AuthenticationService = _AuthenticationService_;

    EmailConfirmationController = $controller('EmailConfirmationController', {
      $scope: scope,
      $stateParams: {key: 'confirmationkey'}
    });

  }));

  it('confirmEmail success test case', function () {
    spyOn(AuthenticationService, 'confirmEmail').and.callThrough();
    EmailConfirmationController.confirmEmail();

    expect(EmailConfirmationController.confirmation).toBe(true);
    expect(AuthenticationService.confirmEmail).toHaveBeenCalled();
  });

  it('confirmEmail fail test case', function () {
    AuthenticationService.response = false;
    spyOn(AuthenticationService, 'confirmEmail').and.callThrough();
    EmailConfirmationController.confirmEmail();

    expect(EmailConfirmationController.confirmation).toBe(false);
    expect(AuthenticationService.confirmEmail).toHaveBeenCalled();
  });
});
