'use strict';

/**
 * @ngdoc service
 * @name spaApp.UserService
 * @description
 * # UserService
 * Service in the spaApp.
 */
angular.module('spaApp')
  .service('UserService', function ($http, envConfig) {
    var base = envConfig.BACKEND_HOST;

    return {
      update: update,
      accounts: accounts,
      removeAccount: removeAccount
    };

    function update(user) {
      return $http.put(base + 'api/user/', user);
    }

    function accounts() {
      return $http.get(base + 'api/social_account/');
    }

    function removeAccount(accountId) {
      return $http.delete(base + '/api/social_account/' + accountId + '/')
    }
  });
