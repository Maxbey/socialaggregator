'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('LoginCtrl', function (AuthenticationService, ToastService) {
    var vm = this;

    vm.login = login;
    vm.facebookLogin = facebookLogin;

    function login(){
      AuthenticationService.login(vm.email, vm.password).then(function(response){
        ToastService.show('You are successfully logged in');
      });
    }

    function facebookLogin(){
      AuthenticationService.facebookLogin().then(function(response){
        ToastService.show('You are successfully logged in via facebook');
      });
    }







  });
