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
      .state('app', {
        abstract: true,
        data: {},
        views: {
          header: {
            templateUrl: 'views/header.html'
          },
          main: {}
        }
      })
      .state('app.dashboard', {
        url: '/',
        data: {
          auth: true
        },
        views: {
          'main@': {
            templateUrl: 'views/main.html'
          }
        }
      })
      .state('app.login', {
        url: '/login',
        views: {
          'main@': {
            templateUrl: 'views/login.html'
          }
        }
      })
      .state('app.register', {
        url: '/register',
        views: {
          'main@': {
            templateUrl: 'views/register.html'
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
      url: '/api/social_auth/login/social/token/facebook/'
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
        return $state.go('app.login');
      }
    }

  });
  $rootScope.$on('$destroy', registrationCallback)
});
