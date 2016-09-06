'use strict';

angular.module('socialAggregator')
  .controller('PasswordResetController', function(AuthenticationService, ToastService, $state) {
    var vm = this;
    vm.reset = reset;

    function reset(email) {
      AuthenticationService.resetPassword(email).then(
        function() {
          ToastService.show('Email with instructions has been sent');
        });
    }
  });
