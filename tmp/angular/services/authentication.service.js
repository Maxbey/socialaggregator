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
