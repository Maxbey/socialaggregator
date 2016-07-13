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
