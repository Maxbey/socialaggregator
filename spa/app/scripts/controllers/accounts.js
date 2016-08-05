'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:AccountsCtrl
 * @description
 * # AccountsCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('AccountsCtrl', function (UserService, AuthenticationService, ToastService, $state) {
  var vm = this;


  vm.loading = true;
  vm.isOpen = false;
  vm.addAccount = addAccount;
  vm.removeAccount = removeAccount;

  vm.providers = [
    'facebook',
    'github',
    'twitter'
  ];


  function addAccount(provider) {
  vm.loading = true;
      AuthenticationService.socialLogin(provider).then(function () {
        ToastService.show(provider + ' account has been successfully added');
        $state.reload();
      }, function (response) {
        vm.loading = false;
        ToastService.error(response.data[0]);
    });
  }

  function removeAccount(account) {
    UserService.removeAccount(account.id).then(function () {
      vm.accounts.splice(vm.accounts.indexOf(account), 1);
      ToastService.show('Account has been successfully removed');
     });
   }

  UserService.accounts().then(function (response) {
      vm.accounts = response.data;
      vm.loading = false;
    });
  });
