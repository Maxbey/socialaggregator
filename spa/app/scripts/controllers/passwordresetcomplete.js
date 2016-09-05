'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:PasswordResetCompleteController
 * @description
 * # PasswordResetCompleteController
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('PasswordResetCompleteController', function(AuthenticationService, ToastService, $stateParams, $state, ResponseService, FormService) {
    var vm = this;

    vm.complete = complete;
    vm.credentials = {};
    vm.resetServerValidation = resetServerValidation;

    vm.backendValidationErrors = {};

    function resetServerValidation(formField) {
      FormService.resetServerValidation(formField, 'serverValidation');
    }

    function complete(form) {
      vm.credentials.token = $stateParams.token;
      vm.credentials.uid = $stateParams.uid;

      AuthenticationService.resetPasswordComplete(vm.credentials).then(function() {
        $state.go('enter.login');
        ToastService.show('Password has been successfully changed');
      }, function(response) {
        vm.backendValidationErrors = ResponseService.parseResponseErrors(response.data);

        FormService.setServerValidation(form, vm.backendValidationErrors, 'serverValidation');

        if (response.data.token || response.data.uid)
          ToastService.show('Incorrect link to reset password');
      });
    }
  });
