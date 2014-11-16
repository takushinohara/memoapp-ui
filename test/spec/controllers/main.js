'use strict';

describe('MainCtrlのテスト', function () {

  // load the controller's module
  beforeEach(module('memoappUiApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  var httpBackend;
  beforeEach(inject(function ($httpBackend) {
    httpBackend = $httpBackend;
  }));

  it('メモ一覧が取得できる', function () {
    httpBackend.expect('GET', 'http://localhost:8080/api/memoapp').respond([
      {id: 1, title:'タイトル１', content:'本文１' },
      {id: 2, title:'タイトル２', content:'本文２' },
      {id: 3, title:'タイトル３', content:'本文３' },
    ]);

    expect(scope.memos.length).toEqual(0);
    httpBackend.flush();
    expect(scope.memos.length).toEqual(3);
  });

  it('メモ詳細が取得できる', function () {
    httpBackend.expect('GET', 'http://localhost:8080/api/memoapp').respond([
      {id: 1, title:'タイトル１', content:'本文１' },
      {id: 2, title:'タイトル２', content:'本文２' },
      {id: 3, title:'タイトル３', content:'本文３' },
    ]);
    httpBackend.expect('GET', 'http://localhost:8080/api/memoapp/1').respond(
      {id: 1, title:'タイトル１', content:'本文１' }
    );

    scope.getDetail(1,0);
    httpBackend.flush();
    expect(scope.mainMemo.title).toEqual('タイトル１');
    expect(scope.mainMemo.content).toEqual('本文１');
  });

  it('メモが追加できる', function () {
    httpBackend.expect('GET', 'http://localhost:8080/api/memoapp').respond([]);
    httpBackend.expect('POST', 'http://localhost:8080/api/memoapp',
      {title:'新規メモ',content:''}
    ).respond(201,'');
    httpBackend.expect('GET', 'http://localhost:8080/api/memoapp').respond([
      {title:'新規メモ',content:''}
    ]);

    scope.add();
    //expect(scope.memos).toEqual([]);
    expect(scope.memos.length).toEqual(0);
    httpBackend.flush();
    //expect(scope.memos).toEqual([{title:'新規メモ',content:''}]);
    expect(scope.memos.length).toEqual(1);
  });

  it('メモが削除できる', function () {
    httpBackend.expect('GET', 'http://localhost:8080/api/memoapp').respond([
      {id: 1, title:'タイトル１', content:'本文１' },
      {id: 2, title:'タイトル２', content:'本文２' },
      {id: 3, title:'タイトル３', content:'本文３' },
    ]);
    httpBackend.expect('DELETE', 'http://localhost:8080/api/memoapp/1'
    ).respond(204,'');

    expect(scope.memos.length).toEqual(0);
    scope.selectedIdx = 0;
    // id: 1 のメモを削除
    scope.remove(1);
    httpBackend.flush();
    expect(scope.memos.length).toEqual(2);
  });

  it('メモが更新できる', function () {
    httpBackend.expect('GET', 'http://localhost:8080/api/memoapp').respond([
      {id: 1, title:'タイトル１', content:'本文１' },
      {id: 2, title:'タイトル２', content:'本文２' },
      {id: 3, title:'タイトル３', content:'本文３' },
    ]);
    httpBackend.expect('PUT', 'http://localhost:8080/api/memoapp/1').respond([
      {id: 1, title:'タイトル１更新', content:'本文１更新' }
    ]).respond(204,'');
    httpBackend.expect('GET', 'http://localhost:8080/api/memoapp').respond([
      {id: 1, title:'タイトル１更新', content:'本文１更新' },
      {id: 2, title:'タイトル２', content:'本文２' },
      {id: 3, title:'タイトル３', content:'本文３' },
    ]);

    expect(scope.memos.length).toEqual(0);
    scope.mainMemo = {id: 1, title:'タイトル１更新', content:'本文１更新' };
    scope.put();
    httpBackend.flush();
    expect(scope.memos.length).toEqual(3);
  });

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

});