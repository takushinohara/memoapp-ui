'use strict';

/**
 * @ngdoc service
 * @name memoappUiApp.factory
 * @description
 * # factory
 * Factory in the memoappUiApp.
 */
angular.module('memoappUiApp')
  .factory('factory', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  })
  .factory('MemoAppApi', ['$resource', 'ApiUrl', function ($resource, ApiUrl) {
    return $resource( ApiUrl + '/:id', {id: '@id'},{
      update: {method: 'PUT'}
    });
  }]);
