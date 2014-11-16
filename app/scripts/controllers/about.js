'use strict';

/**
 * @ngdoc function
 * @name memoappUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the memoappUiApp
 */
angular.module('memoappUiApp')
  .controller('AboutCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
