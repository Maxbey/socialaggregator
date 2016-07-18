'use strict';

/**
 * @ngdoc service
 * @name spaApp.AuthenticationService
 * @description
 * # AuthenticationService
 * Service in the spaApp.
 */
angular.module('spaApp')
  .service('AuthenticationService', function ($http, $cookies, $auth, $log) {
    var socialBaseUrl = 'api/social_auth/token/';
    var baseUrl = 'api/auth/';

    return {
      login: login,
      facebookLogin: facebookLogin,
      githubLogin: githubLogin,
      vkLogin: vkLogin,
      twitterLogin: twitterLogin,
      register: register,
      logout: logout,
      user: user,
      afterLogin: afterLogin
    };


    function login(email, password) {
      return $http.post(baseUrl + 'login/', {
        email: email,
        password: password
      });
    }

    function facebookLogin() {
      return $auth.authenticate('facebook');
    }

    function githubLogin() {
      return $auth.authenticate('github');
    }

    function vkLogin() {
      return $auth.authenticate('vk');
    }

    function twitterLogin() {
      return $auth.authenticate('twitter');
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
      return $http.get(baseUrl + 'user/');
    }

    function logout() {
      $http.defaults.headers.common['Authorization'] = undefined;
      return $auth.logout();
    }

    function afterLogin(token) {
      $http.defaults.headers.common['Authorization'] = 'Token ' + token;
    }


  });

