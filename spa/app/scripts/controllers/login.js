'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('LoginCtrl', function (AuthenticationService, ToastService, $state, $auth) {
    var vm = this;

    vm.login = login;
    vm.socialLogin = socialLogin;

    function login() {
      $auth.login({
        email: vm.email,
        password: vm.password
       }).then(function(response){
        $auth.setToken(response.data.key);
        $state.go('app.dashboard');
        ToastService.show('You are successfully logged in');
       });
    }

    function socialLogin(provider) {
      AuthenticationService.socialLogin(provider).then(function(){
        $state.go('app.dashboard');
        ToastService.show('You are successfully logged in via ' + provider);
      }, function(response){
        ToastService.error(response.data[0]);
      });
    }


  });
