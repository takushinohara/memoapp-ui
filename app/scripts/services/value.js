'use strict';

/**
 * @ngdoc service
 * @name memoappUiApp.value
 * @description
 * # value
 * Value in the memoappUiApp.
 */
angular.module('memoappUiApp')
  .value('value', 42)
  .value('ApiUrl', 'http://localhost:8080/api/memoapp');
