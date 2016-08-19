'use strict';

/**
 * @ngdoc service
 * @name spaApp.AuthenticationService
 * @description
 * # AuthenticationService
 * Service in the spaApp.
 */
angular.module('spaApp')
  .service('AuthenticationService', function ($http, $cookies, $auth, envConfig, $state) {
    var baseUrl = envConfig.BACKEND_HOST + '/api/auth/';

    return {
      login: login,
      socialLogin: socialLogin,
      register: register,
      logout: logout,
      user: user,
      stateControl: stateControl,
      confirmEmail: confirmEmail,
      resetPassword: resetPassword,
      resetPasswordComplete: resetPasswordComplete
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

    function confirmEmail(key) {
      return $http.post(baseUrl + 'confirm_email/', {key: key});
    }

    function resetPassword(email) {
      return $http.post(baseUrl + 'password/reset/', {'email': email});
    }

    function resetPasswordComplete(credentials) {
      return $http.post(baseUrl + 'password/confirm/', credentials);
    }

    function user() {
      return $http.get(envConfig.BACKEND_HOST + '/api/user/');
    }

    function logout() {
      $http.defaults.headers.common['Authorization'] = undefined;
      return $auth.logout();
    }

    function stateControl(event, toState) {
      if (toState.data && toState.data.auth) {
        if (!$auth.isAuthenticated()) {
          event.preventDefault();
          return $state.go('enter.login');
        }
      }
    }

  });
