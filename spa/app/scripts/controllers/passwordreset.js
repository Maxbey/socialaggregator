'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:PasswordResetCtrl
 * @description
 * # PasswordResetCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('PasswordResetCtrl', function(AuthenticationService, ToastService, $state) {
    var vm = this;
    vm.reset = reset;

    function reset(email) {
      AuthenticationService.resetPassword(email).then(
        function(r) {
          ToastService.error('Email with instructions has been sent');
        });
    }
  });
