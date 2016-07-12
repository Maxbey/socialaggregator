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