'use strict';

angular.module('socialAggregator')
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
