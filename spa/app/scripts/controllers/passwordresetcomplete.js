'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:PasswordResetCompleteCtrl
 * @description
 * # PasswordResetCompleteCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('PasswordResetCompleteCtrl', function (AuthenticationService, ToastService, $stateParams, $state, ResponseService, FormService) {
    var vm = this;

    vm.complete = complete;
    vm.credentials = {};
    vm.resetServerValidation = resetServerValidation;

    vm.backendValidationErrors = {};

    function resetServerValidation(formField) {
      formField.$setValidity('serverValidation', null);
    }

    function complete(form) {
      vm.credentials['token'] = $stateParams.token;
      vm.credentials['uid'] = $stateParams.uid;

      AuthenticationService.resetPasswordComplete(vm.credentials).then(function(){
        $state.go('enter.login');
        ToastService.show('Password has been successfully changed');
      }, function(response){
        vm.backendValidationErrors = ResponseService.parseResponseErrors(response.data);

        FormService.setServerValidation(form, vm.backendValidationErrors, 'serverValidation');

        if(response.data['token'] || response.data['uid'])
          ToastService.show('Incorrect link to reset password');
      });
    }

  });
