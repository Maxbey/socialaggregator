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
                templateUrl: 'spa/views/authentication/register.html'
            })
            .when('/login', {
                controller: LoginController,
                controllerAs: 'vm',
                templateUrl: 'spa/views/authentication/login.html'
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
AppServices.factory('Authentication', ['$http', '$cookies', Authentication]);

function Authentication($http, $cookies) {

    var baseUrl = 'api/auth/';

    return {
        login: login,
        register: register,
        logout: logout,
        afterLogin: afterLogin,
        afterLogout: afterLogout

    };

    function register(email, password1, password2, username) {
        return $http.post(baseUrl + 'registration/', {
            username: username,
            password1: password1,
            password2: password2,
            email: email
        });
    }

    function login(email, password) {
        return $http.post(baseUrl + 'login/', {
            email: email,
            password: password
        });
    }

    function logout() {
        return $http.post(baseUrl + 'logout/')
    }

    function afterLogin(response){
        $http.defaults.headers.common.Authorization = 'Token ' + response.key;
        $cookies.token = response.key;
    }

    function afterLogout(){
        delete $http.defaults.headers.common.Authorization;
        delete $cookies.token;
    }

}

AppServices.factory('Posts', ['$http', Posts]);

Posts.$inject = ['$http'];

function Posts($http) {
    return {
        all: all,
        create: create,
        get: get
    };

    function all() {
        return $http.get('/api/v1/posts/');
    }

    function create(content) {
        return $http.post('/api/v1/posts/', {
            content: content
        });
    }

    function get(username) {
        return $http.get('/api/v1/accounts/' + username + '/posts/');
    }
}
AppControllers.controller('LoginController', ['$location', '$scope', '$log', 'Authentication', LoginController]);

function LoginController($window, $scope, $log, Authentication) {
    var vm = this;

    vm.login = login;


    function login() {
        Authentication.login(vm.email, vm.password).then(function (r) {
            Authentication.afterLogin(r);
            $window.location = '/';

        }, function (r) {
            $log.warn(r)
        });
    }
}

AppControllers.controller('NavbarController', NavbarController);

NavbarController.$inject = ['$scope', '$window', 'Authentication'];

/**
 * @namespace NavbarController
 */
function NavbarController($scope, $window, Authentication) {
    var vm = this;

    vm.logout = logout;


    function logout() {
        Authentication.logout().then(function () {
            Authentication.afterLogout();
            $window.location = '/';
        });
    }
}
AppControllers.controller('RegisterController', ['$window', '$scope', '$log', 'Authentication', RegisterController]);

function RegisterController($window, $scope, $log, Authentication) {
    var vm = this;

    vm.register = register;

    function register() {
        Authentication.register(vm.email, vm.password1, vm.password2, vm.username).then(function(r){
            $log.log(r);
        }, function(r){
            $log.log(r);
        });
    }
}