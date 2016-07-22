'use strict';

/**
 * @ngdoc service
 * @name spaApp.UserService
 * @description
 * # UserService
 * Service in the spaApp.
 */
angular.module('spaApp')
  .service('UserService', function ($http) {

    return {
      update: update,
      accounts: accounts,
      removeAccount: removeAccount
    };

    function update(user) {
      return $http.put('api/user/', user);
    }

    function accounts() {
      return $http.get('api/social_account/');
    }

    function removeAccount(accountId) {
      return $http.delete('/api/social_account/' + accountId + '/')
    }
  });