angular.module('userServiceMock', []);
angular.module('userServiceMock').service("UserService", function () {
  var fake = [{id: 1}, {id: 2}];

  this.getAccountsFake = function () {
    return fake;
  };

  this.removeAccount = function () {
    return {
      then: function (cb) {
        return cb()
      }
    }
  };

  this.accounts = function () {
    return {
      then: function (cb) {
        return cb({data: fake})
      }
    }
  };

  this.update = function () {
    return {
      then: function (cb) {
        return cb()
      }
    }
  };
});
