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
    var baseUrl = 'api/auth/';

    return {
        login: login,
        facebookLogin: facebookLogin,
        register: register,
        logout: logout,
        afterLogin: afterLogin,
        afterLogout: afterLogout
    };


    function login(email, password){
        return $http.post(baseUrl + 'login/', {
          email: email,
          password: password
        });
    }

    function facebookLogin(){
        return $auth.authenticate('facebook').then(function(response){
          return $http.post(baseUrl + 'facebook/', {access_token: response.access_token});
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

    function logout(){
        return $http.post(baseUrl + 'logout/');
    }

    function afterLogin(response){
        $http.defaults.headers.common.Authorization = 'Token ' + response.key;
        $cookies.token = response.key;
    }

    function afterLogout(){
        delete $http.defaults.headers.common.Authorization;
        delete $cookies.token;
    }


  });

