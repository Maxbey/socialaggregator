'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('LoginCtrl', function (AuthenticationService, $log) {
    var vm = this;

    vm.login = login;

    function login(){
      AuthenticationService.login(vm.email, vm.password).then(function(response){
        $log.log(response);
      });
    }







  });
