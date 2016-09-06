'use strict';

angular.module('socialAggregator')
  .controller('HeaderLoggedController', function($auth, $state, AuthenticationService) {
    var vm = this;

    vm.logout = logout;

    function logout() {
      AuthenticationService.logout();
      $state.go('enter.login');
    }

    AuthenticationService.user().then(function(response) {
      vm.username = response.data.username;
    });
  });
