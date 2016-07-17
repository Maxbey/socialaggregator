'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('HeaderCtrl', function (AuthenticationService, $auth) {
    var vm = this;

    vm.auth = false;
    if ($auth.isAuthenticated()) {
      AuthenticationService.user().then(function (response) {
        vm.username = response.data.first_name + ' ' + response.data.last_name;
        vm.auth = true;
      });
    }


  });
