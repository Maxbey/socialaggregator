'use strict';

/**
 * @ngdoc overview
 * @name spaApp
 * @description
 * # spaApp
 *
 * Main module of the application.
 */
angular
  .module('spaApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngMaterial',
    'satellizer'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $authProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('enter', {
        abstract: true,
        data: {},
        views: {
          header: {
            templateUrl: 'views/header.html'
          },
          main: {}
        }
      })
      .state('enter.login', {
        url: '/login',
        views: {
          'main@': {
            templateUrl: 'views/login.html'
          }
        }
      })
      .state('enter.register', {
        url: '/register',
        views: {
          'main@': {
            templateUrl: 'views/register.html'
          }
        }
      });


    $stateProvider
      .state('app', {
        abstract: true,
        data: {
          auth: true
        },
        views: {
          header: {
            templateUrl: 'views/header.logged.html'
          },
          main: {}
        }
      })
      .state('app.dashboard', {
        url: '/',
        views: {
          'main@': {
            templateUrl: 'views/main.html'
          }
        }
      })
      .state('app.profile', {
        url: '/im',
        views: {
          'main@': {
            templateUrl: 'views/profile.html'
          }
        }
      });

    $locationProvider.html5Mode({
      enabled: true,
      requiredBase: false
    });

    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';

    $authProvider.loginUrl = '/api/auth/login/';

    $authProvider.facebook({
      clientId: '475009766042261',
      url: '/api/social_auth/login/social/token/facebook/',
      scope: ['email', 'user_friends', 'public_profile'],
    });

    $authProvider.github({
      clientId: 'c2ce5010ca8709e82f4d',
      url: '/api/social_auth/login/social/token/github/'
    });

    $authProvider.oauth2({
      name: 'vk',
      url: '/api/social_auth/login/social/token/vk/',
      redirectUri: window.location.origin + '/',
      clientId: 5546912,
      authorizationEndpoint: 'http://oauth.vk.com/authorize',
      scope: 'friends, photos, email, photo_big',
      display: 'popup',
      responseType: 'code',
      requiredUrlParams: ['response_type', 'client_id', 'redirect_uri', 'display', 'scope', 'v'],
      scopeDelimiter: ',',
      v: '5.52'
    });

    $authProvider.twitter({
      url: '/api/social_auth/login/social/token/twitter/',
      authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
      redirectUri: window.location.origin,
      type: '1.0'
    });

    $authProvider.authToken = 'Token';

  }).run(function ($rootScope, $state, $auth) {
  var registrationCallback = $rootScope.$on("$stateChangeStart", function (event, toState) {
    if (toState.data && toState.data.auth) {
      if (!$auth.isAuthenticated()) {
        event.preventDefault();
        return $state.go('enter.login');
      }
    }

  });
  $rootScope.$on('$destroy', registrationCallback)
});
