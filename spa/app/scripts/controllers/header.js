'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('HeaderCtrl', function (AuthenticationService, $auth, $state) {
    var vm = this;

    vm.auth = false;
    vm.logout = logout;

    function logout() {
      $auth.logout();
      $state.go('app.login');
    }

    if ($auth.isAuthenticated()) {
      AuthenticationService.user().then(function (response) {
        vm.username = AuthenticationService.username(response.data);

        vm.auth = true;
      });
    }


  });
