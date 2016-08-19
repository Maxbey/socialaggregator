'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:PasswordResetCompleteCtrl
 * @description
 * # PasswordResetCompleteCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('PasswordResetCompleteCtrl', function (AuthenticationService, ToastService, $stateParams, $state) {
    var vm = this;

    vm.complete = complete;
    vm.credentials = {}

    function complete(credentials) {
      vm.credentials['token'] = $stateParams.token;
      vm.credentials['uid'] = $stateParams.uid;

      AuthenticationService.resetPasswordComplete(vm.credentials).then(function(){
        $state.go('enter.login');
        ToastService.show('Password has been successfully changed');
      }, function(){
        ToastService.show('Incorrect link to reset password');
      });
    }

  });
