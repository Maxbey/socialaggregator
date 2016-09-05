angular.module('authenticationServiceMock', []);
angular.module('authenticationServiceMock').service("AuthenticationService", function() {

  var successResponse = {
    data: {
      key: 'token'
    }
  };

  var errorResponse = {
    data: {
      uid: 'uid',
      non_field_errors: ['some non-field']
    }
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

  this.login = function() {
    return {
      then: responseSwitcher
    }
  };

  this.socialLogin = function() {
    return {
      then: responseSwitcher
    }
  };

  this.logout = function() {};

  this.user = function() {
    return {
      then: function(cb) {
        return cb({
          data: {
            username: 'username'
          }
        });
      }
    };
  };

  this.register = function() {
    return {
      then: responseSwitcher
    }
  };

  this.changePassword = function() {
    return {
      then: responseSwitcher
    }
  };

  this.confirmEmail = function() {
    return {
      then: responseSwitcher
    }
  };

  this.resetPassword = function() {
    return {
      then: function(cb) {
        return cb();
      }
    };
  };

  this.resetPasswordComplete = function() {
    return {
      then: responseSwitcher
    }
  };
});
