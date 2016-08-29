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
    'ngConstants',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngMaterial',
    'satellizer',
    'ngRaven',
    'validation.match',
    'Backo'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $authProvider, envConfig, $mdThemingProvider) {
    $urlRouterProvider.otherwise('/');
    $httpProvider.defaults.withCredentials = true;

    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('red');

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
      })
      .state('enter.confirmation', {
        url: '/register/confirm/:key',
        views: {
          'main@': {
            templateUrl: 'views/email-confirmation.html'
          }
        }
      })
      .state('enter.passreset', {
        url: '/password/reset',
        views: {
          'main@': {
            templateUrl: 'views/passwordreset.html'
          }
        }
      })
      .state('enter.passresetcomplete', {
        url: '/password/reset/complete/:uid/:token',
        views: {
          'main@': {
            templateUrl: 'views/passwordresetcomplete.html'
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
            templateUrl: 'views/dashboard.html'
          }
        }
      })
      .state('app.settings', {
        url: '/settings',
        views: {
          'main@': {
            templateUrl: 'views/settings.html'
          }
        }
      })
      .state('app.accounts', {
        url: '/accounts',
        views: {
          'main@': {
            templateUrl: 'views/accounts.html'
          }
        }
      });

    $locationProvider.html5Mode({
      enabled: true,
      requiredBase: false
    });

    var base = envConfig.BACKEND_HOST;

    $authProvider.withCredentials = true;
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';

    $authProvider.loginUrl = base + '/api/auth/login/';

    $authProvider.facebook({
      clientId: envConfig.SOCIAL_AUTH_FACEBOOK_KEY,
      url: base + '/api/social_auth/login/social/token/facebook/',
      scope: ['email', 'user_friends', 'public_profile', 'user_location']
    });

    $authProvider.github({
      clientId: envConfig.SOCIAL_AUTH_GITHUB_KEY,
      url: base + '/api/social_auth/login/social/token/github/'
    });

    $authProvider.oauth2({
      name: 'vk',
      url: base + '/api/social_auth/login/social/token/vk/',
      redirectUri: window.location.origin + '/',
      clientId: envConfig.SOCIAL_AUTH_VK_OAUTH2_KEY,
      authorizationEndpoint: 'http://oauth.vk.com/authorize',
      scope: 'friends, photos, email, photo_big',
      display: 'popup',
      responseType: 'code',
      requiredUrlParams: ['response_type', 'client_id', 'redirect_uri', 'display', 'scope', 'v'],
      scopeDelimiter: ',',
      v: '5.52'
    });

    $authProvider.twitter({
      url: base + '/api/social_auth/login/social/token/twitter/',
      authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
      redirectUri: window.location.origin + '/',
      type: '1.0'
    });

    $authProvider.authToken = 'Token';

    Raven.config(envConfig.SENTRY_PUBLIC_DSN, {}).install();
  }).run(function($rootScope, $state, $auth, AuthenticationService) {
    var registrationCallback = $rootScope.$on("$stateChangeStart", AuthenticationService.stateControl);
    $rootScope.$on('$destroy', registrationCallback);
  });
