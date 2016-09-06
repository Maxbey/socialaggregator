'use strict';

angular.module('socialAggregator')
  .factory('FormService', function() {

    return {
      setServerValidation: setServerValidation,
      resetServerValidation: resetServerValidation
    };

    function setServerValidation(form, errors, errorName) {
      for (var field in errors) {
        if (form[field])
          form[field].$setValidity(errorName, false);
      }
    }

    function resetServerValidation(formField, errorName) {
      if(formField.$setValidity)
        formField.$setValidity(errorName, null);
    }
  });
