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