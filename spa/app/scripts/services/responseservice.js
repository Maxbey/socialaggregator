'use strict';

/**
 * @ngdoc service
 * @name spaApp.ResponseService
 * @description
 * # ResponseService
 * Service in the spaApp.
 */
angular.module('spaApp')
  .factory('ResponseService', function() {

    return {
      parseResponseErrors: parseResponseErrors
    };

    function parseResponseErrors(errors) {
      var result = {};

      for (var field in errors) {
        result[field] = {
          message: errors[field][0]
        }
      }

      return result;
    }
  });
