'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('ProfileCtrl', function (AuthenticationService, ToastService, UserService, $state) {
    var vm = this;
    vm.update = update;

    function update() {
      UserService.update(vm.user).then(function () {
        ToastService.show('Your profile successfully updated');
        $state.reload();
      });
    }

    AuthenticationService.user().then(function (response) {
      vm.user = response.data;
    });
  });
