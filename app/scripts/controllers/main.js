'use strict';

/**
 * @ngdoc function
 * @name memoappUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the memoappUiApp
 */
angular.module('memoappUiApp')
  .controller('MainCtrl', ['$scope', 'MemoAppApi', function ($scope, MemoAppApi) {
    // 入力最大文字数定義
    var maxTitleCount = 20;
    var maxContentCount = 140;

    // 一覧取得
    $scope.memos = MemoAppApi.query(function() {
      $scope.selectedIdx = null; 
      $scope.status = 'success';
    }, function() {
      $scope.status = 'error';
    });

    // 詳細取得
    $scope.getDetail = function (memoId, index) {
      $scope.selectedIdx = index; 
      $scope.mainMemo = MemoAppApi.get({id:memoId}, function() {
        $scope.status = 'success';
        initCount();
      }, function() {
        $scope.status = 'error';
        $scope.mainMemo = null;
      });
    };

    // 登録
    $scope.add = function () {
      var obj = {title:'新規メモ',content:''};
      MemoAppApi.save(obj, function () {
        $scope.status = 'success';
        $scope.mainMemo = null;
        $scope.selectedIdx = null;
        $scope.memos = MemoAppApi.query(function() {
          }, function(){
            $scope.status = 'error';
        });
      }, function() {
        $scope.status = 'error';
      });
    };

    // 更新
    $scope.put = function () {
      MemoAppApi.update($scope.mainMemo, function() {
        $scope.status = 'success';
        initCount();
        $scope.memos = MemoAppApi.query(function() {
          }, function(){
            $scope.status = 'error';
        });
      }, function() {
        $scope.status = 'error';
      });
    };

    // 削除
    $scope.remove = function (memoId) {
      MemoAppApi.delete({id:memoId}, function () {
        $scope.status = 'success';
        $scope.memos.splice($scope.selectedIdx, 1);
        $scope.mainMemo = null;
        $scope.selectedIdx = null;
      }, function() {
        $scope.status = 'error';
      });
    };

    // タイトルの文字数カウント
    $scope.changeTitle = function () {
      $scope.titleCount = maxTitleCount - $scope.mainMemo.title.length;
      if ($scope.titleCount < 0) {
        $scope.isOverTitle = true;
      } else if ($scope.titleCount === maxTitleCount) {
        $scope.isNoTitle = true;
      } else {
        $scope.isNoTitle = false;
        $scope.isOverTitle = false;
      }
    };

    // 本文の文字数カウント
    $scope.changeContent = function () {
      $scope.contentCount = maxContentCount - $scope.mainMemo.content.length;
      if ($scope.contentCount < 0) {
        $scope.isOverContent = true;
      } else {
        $scope.isOverContent = false;
      }
    };

    // 検索実行時に詳細表示をリセット
    $scope.changeSearch = function () {
      $scope.selectedIdx = null;
      $scope.mainMemo = null; 
    };

    // タイトル一覧のactive制御
    $scope.isActive = function (index) { 
      return $scope.selectedIdx === index;
    };

    // 入力文字数の設定初期化
    function initCount() {
      $scope.titleCount = null;
      $scope.contentCount = null;
      $scope.isNoTitle = false;
      $scope.isOverTitle = false;
      $scope.isOverContent = false;
    }

    // エラー状態の確認
    $scope.isError = function () {
      return $scope.status === 'error';
    };

    // エラーメッセージを閉じる
    $scope.closeAlert = function() {
      $scope.status = '';
    };

  }]);
