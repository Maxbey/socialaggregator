angular.module('formServiceMock', []);
angular.module('formServiceMock').service("FormService", function () {
  var fake = [{id: 1}, {id: 2}];

  this.setServerValidation = function() {};
  this.resetServerValidation = function() {};
});
