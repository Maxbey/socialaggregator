'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('MainCtrl', function (AuthenticationService) {
    var vm = this;

    AuthenticationService.user().then(function(r){
      console.log(r);
    });
  });
