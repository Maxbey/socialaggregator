'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('ProfileCtrl', function (AuthenticationService, ToastService, UserService) {
    var vm = this;

    vm.addFacebook = addFacebook;
    vm.addTwitter = addTwitter;
    vm.addGithub = addGithub;

    function addFacebook() {
      AuthenticationService.facebookLogin().then(function(){
        showToast('Facebook');
      });
    }

    function addTwitter() {
      AuthenticationService.twitterLogin().then(function(){
        showToast('Twitter');
      });
    }

    function addGithub() {
      AuthenticationService.githubLogin().then(function(){
        showToast('Github');
      });
    }

    function showToast(provider) {
      ToastService.show(provider + ' account added');
    }

    AuthenticationService.user().then(function(response){
      vm.user = response.data;
    });

    UserService.accounts().then(function(r){
      console.log(r);
    });
  });
