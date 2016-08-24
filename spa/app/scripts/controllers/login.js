'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('LoginCtrl', function (AuthenticationService, ToastService, $state, $auth, FormService, ResponseService) {
    var vm = this;

    vm.login = login;
    vm.socialLogin = socialLogin;
    vm.backendValidationErrors = {};
    vm.resetServerValidation = resetServerValidation;

    function resetServerValidation(formField) {
      formField.$setValidity('serverValidation', null);
    }

    function login(form) {
      AuthenticationService
        .login(vm.email, vm.password)
        .then(function(response){
        $auth.setToken(response.data.key);
        ToastService.show('You are successfully logged in');
        $state.go('app.dashboard');
       }, function(response){
        vm.backendValidationErrors = ResponseService.parseResponseErrors(response.data);
        FormService.setServerValidation(form, vm.backendValidationErrors, 'serverValidation');

        if(response.data['non_field_errors'])
          ToastService.error(response.data['non_field_errors'][0]);
       });
    }

    function socialLogin(provider) {
      AuthenticationService.socialLogin(provider).then(function(){
        $state.go('app.dashboard');
        ToastService.show('You are successfully logged in via ' + provider);
      }, function(response){
        if (response.data[0])
          ToastService.error(response.data[0]);
      });
    }


  });
