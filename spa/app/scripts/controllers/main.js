'use strict';

/**
 * @ngdoc function
 * @name spaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spaApp
 */
angular.module('spaApp')
  .controller('MainCtrl', function ($auth, $log) {
    var vm = this;

    vm.facebook = facebook;

    function facebook() {
      $auth.authenticate('facebook').then(function(response){
        $log.log(response);
      });
    }
  });
