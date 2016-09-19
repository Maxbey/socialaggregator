'use strict';

angular.module('socialAggregator')
  .controller('EmailConfirmationController', function(AuthenticationService, $stateParams) {
    var vm = this;

    vm.confirmation = undefined;
    vm.confirmEmail = confirmEmail;

    function confirmEmail() {
      AuthenticationService.confirmEmail($stateParams.key).then(function() {
        vm.confirmation = true;
      }, function() {
        vm.confirmation = false;
      });
    }

    confirmEmail();
  });
