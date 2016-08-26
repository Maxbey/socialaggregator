'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:AccountsCtrl
 * @description
 * # AccountsCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('AccountsCtrl', function(UserService, AuthenticationService, ToastService, $state, $timeout, Backoff) {
    var vm = this;

    vm.addAccount = addAccount;
    vm.removeAccount = removeAccount;

    vm.loading = false;

    vm.providers = [
      'facebook',
      'github',
      'twitter'
    ];

    var backoff = new Backoff({
      min: 100,
      max: 2000
    });

    function accountsTimer() {
      vm.loading = true;
      $timeout(function() {
        loadAccounts();
      }, backoff.duration());
    }

    function addAccount(provider) {
      AuthenticationService.socialLogin(provider).then(function() {
        ToastService.show(provider + ' account has been successfully added');
        $state.reload();
      }, function(response) {
        ToastService.error(response.data[0]);
      });
    }

    function removeAccount(account) {
      UserService.removeAccount(account.id).then(function() {
        var index = vm.accounts.indexOf(account);

        if (index === -1)
          throw new Error('Attempt to delete a non-existent account');

        vm.accounts.splice(index, 1);
        ToastService.show('Account has been successfully removed');
      });
    }

    function loadAccounts() {
      UserService.accounts().then(function(response) {
        vm.accounts = response.data;
        vm.loading = false;
      }, function(response) {
        if (response.data === 'CELERY_PROCESSING')
          accountsTimer();
      });
    }

    accountsTimer();
  });
