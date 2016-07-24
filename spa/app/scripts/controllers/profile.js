'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('ProfileCtrl', function (AuthenticationService, ToastService, UserService) {
    var vm = this;

    vm.addAccount = addAccount;
    vm.update = update;
    vm.removeAccount = removeAccount;

    function addAccount(provider) {
      AuthenticationService.socialLogin(provider).then(function () {
        ToastService.show(provider + ' account has been successfully added');
      }, function (response) {
        ToastService.error(response.data[0]);
      });
    }

    function update() {
      UserService.update(vm.user).then(function () {
        ToastService.show('Your profile successfully updated');
      });
    }

    function removeAccount(account) {
      UserService.removeAccount(account.id).then(function () {
        vm.accounts.splice(vm.accounts.indexOf(account), 1);
        ToastService.show('Account has been successfully removed');
      });
    }

    AuthenticationService.user().then(function (response) {
      vm.user = response.data;
    });

    UserService.accounts().then(function (response) {
      vm.accounts = response.data;
    });
  });
