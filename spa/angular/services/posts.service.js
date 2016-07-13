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