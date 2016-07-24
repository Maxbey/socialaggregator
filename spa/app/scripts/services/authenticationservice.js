'use strict';

/**
 * @ngdoc service
 * @name spaApp.AuthenticationService
 * @description
 * # AuthenticationService
 * Service in the spaApp.
 */
angular.module('spaApp')
  .service('AuthenticationService', function ($http, $cookies, $auth) {
    var baseUrl = 'api/auth/';

    return {
      login: login,
      socialLogin: socialLogin,
      register: register,
      logout: logout,
      user: user
    };

    function socialLogin(provider) {
      return $auth.authenticate(provider);
    }

    function login(email, password) {
      return $http.post(baseUrl + 'login/', {
        email: email,
        password: password
      });
    }

    function register(email, password1, password2, username) {
      return $http.post(baseUrl + 'registration/', {
        username: username,
        password1: password1,
        password2: password2,
        email: email
      });
    }

    function user() {
      return $http.get('api/user/');
    }

    function logout() {
      $http.defaults.headers.common['Authorization'] = undefined;
      return $auth.logout();
    }

  });
