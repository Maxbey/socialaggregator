'use strict';

var App = angular.module('App', [
    'ngCookies',
    'ngRoute',
    'appServices',
    'appControllers'

], function ($httpProvider) {
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
});

var AppServices = angular.module('appServices', []),
    AppControllers = angular.module('appControllers', []);


App.config([
    '$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider
            .when('/register', {
                controller: RegisterController,
                controllerAs: 'vm',
                templateUrl: 'static/views/authentication/register.html'
            })
            .when('/login', {
                controller: LoginController,
                controllerAs: 'vm',
                templateUrl: 'static/views/authentication/login.html'
            })
            .otherwise('/');


    }
]);

App.run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$viewContentLoaded', function() {
        $timeout(function() {
            componentHandler.upgradeAllRegistered();
        });
    });
});