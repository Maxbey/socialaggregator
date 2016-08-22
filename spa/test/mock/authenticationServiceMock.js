angular.module('authenticationServiceMock', []);
angular.module('authenticationServiceMock').service("AuthenticationService", function () {

  var successResponse = {data: {key: 'token'}};
  var errorResponse = {data: ['some error']};

  self = this;

  function responseSwitcher(scb, ecb){
    if(self.response)
      return scb(successResponse);

    return ecb(errorResponse);
  }

  this.response = true;

  this.login = function () {
    return {
      then: responseSwitcher
    }
  };

  this.socialLogin = function () {
    return {
      then: responseSwitcher
    }
  };

  this.logout = function () {
  };

  this.user = function () {
    return {
      then: function (cb) {
        return cb({data: {username: 'username'}});
      }
    };
  };

  this.register = function () {
    return {
      then: responseSwitcher
    }
  };

  this.changePassword = function () {
    return {
      then: responseSwitcher
    }
  };

  this.confirmEmail = function() {
    return {
      then: responseSwitcher
    }
  };
});
