angular.module('responseServiceMock', []);
angular.module('responseServiceMock').service("ResponseService", function () {
  var fake = [{id: 1}, {id: 2}];

  this.parseResponseErrors = function() {};
});
