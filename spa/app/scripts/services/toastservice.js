'use strict';

/**
 * @ngdoc service
 * @name spaApp.ToastService
 * @description
 * # ToastService
 * Service in the spaApp.
 */
angular.module('spaApp')
  .service('ToastService', function($mdToast) {
    var delay = 3000,
      position = 'bottom left',
      action = 'OK';

    return {
      show: function(content) {
        if (!content) {
          return false;
        }

        return $mdToast.show(
          $mdToast.simple()
          .content(content)
          .position(position)
          .hideDelay(delay)
        );
      },
      withAction: function(content, actionText) {
        if (!content) {
          return false;
        }

        return $mdToast.show(
          $mdToast.simple()
          .content(content)
          .position(position)
          .action(actionText)
          .highlightAction(true)
          .hideDelay(delay * 1.5)
        );
      },
      error: function(content) {
        if (!content) {
          return false;
        }

        return $mdToast.show(
          $mdToast.simple()
          .content(content)
          .position(position)
          .action(action)
          .hideDelay(delay * 3)
        );
      }
    };
  });
