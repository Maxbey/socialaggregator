'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('RegisterCtrl', function (AuthenticationService, $log) {
    var vm = this;

    vm.register = register;

    function register(){
      AuthenticationService.register(vm.email, vm.password1, vm.password2, vm.username).then(function(response){
        $log.log(response);
      });
    }



  });
