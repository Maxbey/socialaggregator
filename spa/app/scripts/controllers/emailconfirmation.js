'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('EmailConfirmationCtrl', function(AuthenticationService, $stateParams) {
    var vm = this;

    vm.confirmation = undefined;

    AuthenticationService.confirmEmail($stateParams.key).then(function() {
      vm.confirmation = true;
    }, function() {
      vm.confirmation = false;
    });
  });
