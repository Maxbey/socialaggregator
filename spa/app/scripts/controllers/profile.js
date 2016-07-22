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
    vm.update = update;
    vm.removeAccount = removeAccount;

    function errorCallback(response){
      ToastService.error(response.data[0]);
    }

    function addFacebook() {
      AuthenticationService.facebookLogin().then(function(){
        showToast('Facebook');
      }, errorCallback);
    }

    function addTwitter() {
      AuthenticationService.twitterLogin().then(function(){
        showToast('Twitter');
      }), errorCallback;
    }

    function addGithub() {
      AuthenticationService.githubLogin().then(function(){
        showToast('Github');
      }, errorCallback);
    }

    function showToast(provider) {
      ToastService.show(provider + ' account has been successfully added');
    }

    function update() {
      UserService.update(vm.user).then(function(response){
        ToastService.show('Your profile successfully updated');
      });
    }

    function removeAccount(account) {
      UserService.removeAccount(account.id).then(function(r){
        vm.accounts.splice(vm.accounts.indexOf(account), 1);
        ToastService.show('Account has been successfully removed');
      });
    }

    AuthenticationService.user().then(function(response){
      vm.user = response.data;
    });

    UserService.accounts().then(function(response){
      vm.accounts = response.data;
    });
  });
