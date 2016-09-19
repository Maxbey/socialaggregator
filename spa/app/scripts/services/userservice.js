'use strict';

angular.module('socialAggregator')
  .factory('UserService', function($http, envConfig) {
    var baseUrl = envConfig.BACKEND_HOST + '/api';

    return {
      update: update,
      accounts: accounts,
      persons: persons,
      removeAccount: removeAccount
    };

    function update(user) {
      return $http.put(baseUrl + '/user/', user);
    }

    function accounts() {
      return $http.get(baseUrl + '/social_account/');
    }

    function persons(page, name) {
      var query = '?page=' + page;

      if (name)
        query += '&name=' + name;

      return $http.get(baseUrl + '/social_person/' + query);
    }

    function removeAccount(accountId) {
      return $http.delete(baseUrl + '/social_account/' + accountId + '/');
    }
  });
