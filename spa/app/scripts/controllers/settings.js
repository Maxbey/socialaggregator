'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('SettingsCtrl', function(AuthenticationService, ToastService, UserService, ResponseService, FormService) {
    var vm = this;

    vm.updateProfile = updateProfile;
    vm.changePassword = changePassword;
    vm.resetServerValidation = resetServerValidation;

    vm.credentials = {};

    vm.backendValidationErrors = {};

    function updateProfile(form) {
      UserService.update(vm.user).then(function() {
        ToastService.show('Your profile successfully updated');
      }, function(response) {
        vm.backendValidationErrors = ResponseService.parseResponseErrors(response.data);

        FormService.setServerValidation(form, vm.backendValidationErrors, 'serverValidation');
      });
    }

    function resetServerValidation(formField) {
      FormService.resetServerValidation(formField, 'serverValidation');
    }

    function changePassword(form) {
      AuthenticationService.changePassword(vm.credentials).then(function(response) {
        ToastService.show(response.data.success);
      }, function(response) {
        vm.backendValidationErrors = ResponseService.parseResponseErrors(response.data);

        FormService.setServerValidation(form, vm.backendValidationErrors, 'serverValidation');
      });
    }

    AuthenticationService.user().then(function(response) {
      vm.user = response.data;
    });
  });
