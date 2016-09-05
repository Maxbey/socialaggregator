angular.module('userServiceMock', []);
angular.module('userServiceMock').service("UserService", function() {
  var fake = [{
    id: 1
  }, {
    id: 2
  }];

  var successResponse = {
    data: fake
  };

  var errorResponse = {
    data: ['some error']
  };

  self = this;

  function responseSwitcher(scb, ecb) {
    if (self.response)
      return scb(successResponse);

    return ecb(errorResponse);
  }

  this.response = true;

  this.specifyErrorData = function(data) {
    errorResponse.data = data;
  };

  this.specifySuccessData = function(data) {
    successResponse.data = data;
  };

  this.specifyResponseType = function(type) {
    self.response = type;
  };

  this.getAccountsFake = function() {
    return fake;
  };

  this.removeAccount = function() {
    return {
      then: function(cb) {
        return cb()
      }
    }
  };

  this.accounts = function() {
    return {
      then: responseSwitcher
    };
  };

  this.persons = function() {
    return {
      then: responseSwitcher
    };
  }

  this.update = function() {
    return {
      then: responseSwitcher
    };

  };
});
