'use strict';

/**
 * @ngdoc service
 * @name spaApp.ResponseService
 * @description
 * # ResponseService
 * Service in the spaApp.
 */
angular.module('spaApp')
  .service('ResponseService', function($http, envConfig) {

    return {
      parseResponseErrors: parseResponseErrors
    };

    function parseResponseErrors(errors) {
      result = {};

      for (field in errors) {
        result[field] = {
          message: errors[field][0]
        }
      }

      return result;
    }
  });
