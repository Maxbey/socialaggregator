'use strict';

describe('Controller: AccountsCtrl', function() {

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
    scope,
    $timeout;

  var accounts;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _AuthenticationService_, _UserService_, _$state_, _$timeout_) {
    scope = $rootScope.$new();
    AuthenticationService = _AuthenticationService_;
    UserService = _UserService_;
    $state = _$state_;
    $timeout = _$timeout_;

    ToastServiceMock = {
      show: function() {},
      error: function() {}
    };

    accounts = _UserService_.getAccountsFake();

    AccountsCtrl = $controller('AccountsCtrl', {
      $scope: scope,
      ToastService: ToastServiceMock,
      $state: $state,
      $timeout: _$timeout_
    });
  }));

  it('interface should be defined', function() {
    expect(AccountsCtrl.addAccount).toBeDefined();
    expect(AccountsCtrl.removeAccount).toBeDefined();
  });

  it('addAccount success case', function() {

    spyOn(AuthenticationService, 'socialLogin').and.callThrough();
    spyOn(ToastServiceMock, 'show').and.callThrough();
    spyOn($state, 'reload').and.callThrough();

    AccountsCtrl.addAccount('twitter');

    expect(AuthenticationService.socialLogin).toHaveBeenCalled();
    expect(ToastServiceMock.show)
      .toHaveBeenCalledWith('twitter account has been successfully added');
    expect($state.reload).toHaveBeenCalled();
  });

  it('addAccount error case', function() {
    AuthenticationService.specifyResponseType(false);
    AuthenticationService.specifyErrorData(['some error']);
    spyOn(AuthenticationService, 'socialLogin').and.callThrough();

    spyOn(ToastServiceMock, 'error').and.callThrough();
    AccountsCtrl.addAccount('facebook');

    expect(AuthenticationService.socialLogin).toHaveBeenCalled();
    expect(ToastServiceMock.error).toHaveBeenCalledWith('some error');
  });

  it('removeAccount should call UserService.removeAccount', function() {
    spyOn(ToastServiceMock, 'show').and.callThrough();
    spyOn(UserService, 'removeAccount').and.callThrough();

    var lengthBefore = accounts.length;
    AccountsCtrl.accounts = accounts;
    AccountsCtrl.removeAccount(accounts[0]);

    expect(AccountsCtrl.accounts.length).toBe(lengthBefore - 1);

    expect(ToastServiceMock.show).toHaveBeenCalled();
    expect(UserService.removeAccount).toHaveBeenCalled();
  });

  it('Attempt to remove non-existent account should throw exception', function() {
    AccountsCtrl.accounts = [];

    expect(function() {
        AccountsCtrl.removeAccount({})
      })
      .toThrow(new Error('Attempt to delete a non-existent account'));
  });

  it('loadAccounts success test case', function() {
    spyOn(UserService, 'accounts').and.callThrough();

    AccountsCtrl.loadAccounts();

    expect(UserService.accounts).toHaveBeenCalled();
    expect(AccountsCtrl.loading).toBe(false);
  });

  it('loadAccounts fail test case, accountsTimer should be called', function() {
    UserService.specifyResponseType(false);
    spyOn(UserService, 'accounts').and.callThrough();
    spyOn(AccountsCtrl, 'accountsTimer');

    UserService.specifyErrorData('CELERY_PROCESSING');
    AccountsCtrl.loadAccounts();

    expect(UserService.accounts).toHaveBeenCalled();
    expect(AccountsCtrl.accountsTimer).toHaveBeenCalled();
  });

  it('loadAccounts fail test case, accountsTimer should not be called', function() {
    UserService.specifyResponseType(false);
    spyOn(UserService, 'accounts').and.callThrough();
    spyOn(AccountsCtrl, 'accountsTimer');

    AccountsCtrl.loadAccounts();

    expect(UserService.accounts).toHaveBeenCalled();
    expect(AccountsCtrl.accountsTimer).not.toHaveBeenCalled();
  });

  it('accountsTimer should call loadAccounts into timeout', function() {
    spyOn(AccountsCtrl, 'loadAccounts');

    AccountsCtrl.accountsTimer();
    $timeout.flush();

    expect(AccountsCtrl.loading).toBe(true);
    expect(AccountsCtrl.loadAccounts).toHaveBeenCalled();
  });

});
