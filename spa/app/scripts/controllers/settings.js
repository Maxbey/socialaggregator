'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('SettingsCtrl', function (AuthenticationService, ToastService, UserService) {
    var vm = this;
    vm.updateProfile = updateProfile;
    vm.changePassword = changePassword;

    vm.credentials = {};

    function updateProfile() {
      UserService.update(vm.user).then(function () {
        ToastService.show('Your profile successfully updated');
      });
    }

    function changePassword() {
      AuthenticationService.changePassword(vm.credentials).then(function(response) {
        ToastService.show(response.data.success);
      }, function(r) {
        console.log(r);
      });
    }

    AuthenticationService.user().then(function (response) {
      vm.user = response.data;
    });
  });
