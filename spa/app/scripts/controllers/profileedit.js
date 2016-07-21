'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:ProfileeditCtrl
 * @description
 * # ProfileeditCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('ProfileEditCtrl', function (AuthenticationService, UserService, ToastService) {
    var vm = this;

    vm.user = false;
    vm.update = update;

    function update() {
      UserService.update(vm.user).then(function(response){
        ToastService.show('Your profile successfully updated');
      });
    }

    AuthenticationService.user().then(function(response){
      vm.user = response.data;
    });


  });
