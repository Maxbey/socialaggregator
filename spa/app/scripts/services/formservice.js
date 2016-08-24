'use strict';

/**
 * @ngdoc service
 * @name spaApp.FormService
 * @description
 * # FormService
 * Service in the spaApp.
 */
angular.module('spaApp')
  .service('FormService', function ($http, envConfig) {

    return {
      setServerValidation: setServerValidation
    };

    function setServerValidation(form, errors, errorName) {
      for (field in errors) {
        if (form[field])
          form[field].$setValidity(errorName, false);
      }
    }
  });
