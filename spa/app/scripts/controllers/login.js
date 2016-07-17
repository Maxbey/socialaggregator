'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('LoginCtrl', function (AuthenticationService, ToastService, $state) {
    var vm = this;

    vm.login = login;
    vm.facebookLogin = facebookLogin;
    vm.githubLogin = githubLogin;
    vm.vkLogin = vkLogin;
    vm.twitterLogin = twitterLogin;

    function login() {
      AuthenticationService.login(vm.email, vm.password).then(function (response) {
        $state.go('app.dashboard');
        ToastService.show('You are successfully logged in');
      });
    }

    function facebookLogin() {
      AuthenticationService.facebookLogin().then(function (response) {
        $state.go('app.dashboard');
        ToastService.show('You are successfully logged in via facebook');
      });
    }

    function githubLogin() {
      AuthenticationService.githubLogin().then(function (response) {
        $state.go('app.dashboard');
        ToastService.show('You are successfully logged in via github');
      });
    }

    function vkLogin() {
      console.log('here');
      AuthenticationService.vkLogin().then(function (response) {
        ToastService.show('You are successfully logged in via Vkontakte');
      });
    }

    function twitterLogin() {
      AuthenticationService.twitterLogin().then(function (response) {
        $state.go('app.dashboard');
        ToastService.show('You are successfully logged in via twitter');
      });
    }


  });
