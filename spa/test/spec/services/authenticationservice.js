'use strict';

describe('Service: AuthenticationService', function() {

  var $authMock = {
    authenticate: function() {},
    logout: function() {},
    isAuthenticated: function() {
      return false
    }
  };

  // load the service's module
  beforeEach(module('spaApp', function($provide) {
    $provide.value('$auth', $authMock);
  }));

  beforeEach(module('stateMock'));
  // instantiate service
  var AuthenticationService,
    apiUrl,
    $state,
    httpBackend,
    $http;

  beforeEach(inject(function(_AuthenticationService_, $httpBackend, envConfig, _$state_, _$http_) {
    AuthenticationService = _AuthenticationService_;
    httpBackend = $httpBackend;
    $state = _$state_;
    $http = _$http_;

    apiUrl = envConfig.BACKEND_HOST + '/api';
  }));

  it('should do post request to login endpoint', function() {
    AuthenticationService.login({});

    httpBackend
      .expect('POST', apiUrl + '/auth/login/')
      .respond(200);

    expect(httpBackend.flush).not.toThrow();
  });

  it('should do post request to registration endpoint', function() {
    AuthenticationService.register('email', 'pass', 'pass', 'uname');

    httpBackend
      .expect('POST', apiUrl + '/auth/registration/')
      .respond(200);

    expect(httpBackend.flush).not.toThrow();
  });

  it('should do get request to user details endpoint', function() {
    AuthenticationService.user();

    httpBackend
      .expect('GET', apiUrl + '/user/')
      .respond(200);

    expect(httpBackend.flush).not.toThrow();
  });

  it('should do post request to email confirmation endpoint', function() {
    AuthenticationService.confirmEmail('somekey');

    httpBackend
      .expect('POST', apiUrl + '/auth/confirm_email/')
      .respond(200);

    expect(httpBackend.flush).not.toThrow();
  });

  it('should do post request to change password endpoint', function() {
    AuthenticationService.changePassword({});

    httpBackend
      .expect('POST', apiUrl + '/auth/password/change/')
      .respond(200);

    expect(httpBackend.flush).not.toThrow();
  });

  it('should do post request to reset password endpoint', function() {
    AuthenticationService.resetPassword('owneremail');

    httpBackend
      .expect('POST', apiUrl + '/auth/password/reset/')
      .respond(200);

    expect(httpBackend.flush).not.toThrow();
  });

  it('should do post request to reset password complete endpoint', function() {
    AuthenticationService.resetPasswordComplete({});

    httpBackend
      .expect('POST', apiUrl + '/auth/password/confirm/')
      .respond(200);

    expect(httpBackend.flush).not.toThrow();
  });

  it('should call $auth.authenticate method', function() {
    spyOn($authMock, 'authenticate').and.callThrough();
    AuthenticationService.socialLogin('twitter');

    expect($authMock.authenticate).toHaveBeenCalled();
  });

  it('should call $auth.logout method', function() {
    spyOn($authMock, 'logout').and.callThrough();
    AuthenticationService.logout();

    expect($http.defaults.headers.common['Authorization']).toBe(undefined);

    expect($authMock.logout).toHaveBeenCalled();
  });

  it('should change state to enter.login', function() {
    var event = {
      preventDefault: function() {}
    }
    var toState = {
      data: {
        auth: true
      }
    }
    $state.expectTransitionTo('enter.login');

    AuthenticationService.stateControl(event, toState)

  });

  it('should not change state, because state does not require auth', function() {
    var event = {
      preventDefault: function() {}
    }
    var toState = {
      data: {
        auth: false
      }
    }

    AuthenticationService.stateControl(event, toState)

  });

  it('should not change state, because authenticated', function() {
    var event = {
      preventDefault: function() {}
    }
    var toState = {
      data: {
        auth: true
      }
    }

    $authMock.isAuthenticated = function() {
      return true
    }

    AuthenticationService.stateControl(event, toState)

  });

});
