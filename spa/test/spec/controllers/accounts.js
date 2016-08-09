'use strict';

describe('Controller: AccountsCtrl', function () {

  // load the controller's module
  beforeEach(module('spaApp'));

  beforeEach(module('stateMock'));
  beforeEach(module('userServiceMock'));
  beforeEach(module('authenticationServiceMock'));

  var AccountsCtrl,
    AuthenticationService,
    UserService,
    $state,
    ToastServiceMock,
    scope;

  var accounts;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _AuthenticationService_, _UserService_, _$state_) {
    scope = $rootScope.$new();
    AuthenticationService = _AuthenticationService_;
    UserService = _UserService_;
    $state = _$state_;


    ToastServiceMock = {
      show: function () {
      },
      error: function () {
      }
    };

    accounts = _UserService_.getAccountsFake();

    AccountsCtrl = $controller('AccountsCtrl', {
      $scope: scope,
      AuthenticationService: AuthenticationService,
      ToastService: ToastServiceMock,
      $state: $state,
      UserService: _UserService_
    });
  }));

  it('interface should be defined', function () {
    expect(AccountsCtrl.addAccount).toBeDefined();
    expect(AccountsCtrl.removeAccount).toBeDefined();
  });

  it('accounts array should be added to the scope', function () {
    expect(AccountsCtrl.accounts.length)
      .toBe(accounts.length)
  });

  it('addAccount success case', function () {

    spyOn(AuthenticationService, 'socialLogin').and.callThrough();
    spyOn(ToastServiceMock, 'show').and.callThrough();
    spyOn($state, 'reload').and.callThrough();

    AccountsCtrl.addAccount('twitter');

    expect(AuthenticationService.socialLogin).toHaveBeenCalled();
    expect(ToastServiceMock.show).toHaveBeenCalled();
    expect($state.reload).toHaveBeenCalled();
  });

  it('addAccount error case', function(){
    AuthenticationService.response = false;

    spyOn(ToastServiceMock, 'error').and.callThrough();
    AccountsCtrl.addAccount('facebook');

    expect(ToastServiceMock.error).toHaveBeenCalled();
  });

  it('removeAccount should call UserService.removeAccount', function () {
    spyOn(ToastServiceMock, 'show').and.callThrough();
    spyOn(UserService, 'removeAccount').and.callThrough();

    var lengthBefore = AccountsCtrl.accounts.length;

    AccountsCtrl.removeAccount(accounts[0]);

    expect(AccountsCtrl.accounts.length).toBe(lengthBefore - 1);

    expect(ToastServiceMock.show).toHaveBeenCalled();
    expect(UserService.removeAccount).toHaveBeenCalled();
  });

  it('Attempt to remove non-existent account should throw exception', function(){

    expect(function(){AccountsCtrl.removeAccount({})})
      .toThrow(new Error('Attempt to delete a non-existent account'));

  });

});
