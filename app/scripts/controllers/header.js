'use strict';

/**
 * @ngdoc function
 * @name memoappUiApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the memoappUiApp
 */
angular.module('memoappUiApp')
  .controller('HeaderCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.isActive = function (path) { 
        return $location.path() === path;
    };
  }]);
