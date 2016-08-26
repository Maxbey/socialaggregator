'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:HeaderloggedCtrl
 * @description
 * # HeaderloggedCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('HeaderLoggedCtrl', function($auth, $state, AuthenticationService) {
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
