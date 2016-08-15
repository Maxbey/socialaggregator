'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('DashboardCtrl', function (UserService) {
    var vm = this;

    UserService.persons().then(function(response){
      vm.persons = response.data
    });
  });
