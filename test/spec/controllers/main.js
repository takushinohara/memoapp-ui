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
    expect(scope.status).toBe('success');
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
    expect(scope.status).toBe('success');
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
    expect(scope.memos.length).toEqual(0);
    httpBackend.flush();
    expect(scope.status).toBe('success');
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
    scope.remove(1);
    httpBackend.flush();
    expect(scope.status).toBe('success');
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
    expect(scope.status).toBe('success');
    expect(scope.memos.length).toEqual(3);
  });

  it('メモ一覧の取得に失敗する', function () {
    httpBackend.expect('GET', 'http://localhost:8080/api/memoapp').respond(500,'');
    httpBackend.flush();
    expect(scope.status).toBe('error');
  });

  it('メモ詳細の取得に失敗する', function () {
    httpBackend.expect('GET', 'http://localhost:8080/api/memoapp').respond([
      {id: 1, title:'タイトル１', content:'本文１' }
    ]);
    httpBackend.expect('GET', 'http://localhost:8080/api/memoapp/1').respond(500,'');

    scope.getDetail(1,0);
    httpBackend.flush();
    expect(scope.status).toBe('error');
  });

  it('メモ追加に失敗する', function () {
    httpBackend.expect('GET', 'http://localhost:8080/api/memoapp').respond([]);
    httpBackend.expect('POST', 'http://localhost:8080/api/memoapp',
      {title:'新規メモ',content:''}
    ).respond(500,'');

    scope.add();
    httpBackend.flush();
    expect(scope.status).toBe('error');
  });

  it('メモ削除に失敗する', function () {
    httpBackend.expect('GET', 'http://localhost:8080/api/memoapp').respond([
      {id: 1, title:'タイトル１', content:'本文１' }
    ]);
    httpBackend.expect('DELETE', 'http://localhost:8080/api/memoapp/1').respond(500,'');

    scope.remove(1);
    httpBackend.flush();
    expect(scope.status).toBe('error');
  });

  it('メモ更新に失敗する', function () {
    httpBackend.expect('GET', 'http://localhost:8080/api/memoapp').respond([
      {id: 1, title:'タイトル１', content:'本文１' }
    ]);
    httpBackend.expect('PUT', 'http://localhost:8080/api/memoapp/1').respond([
      {id: 1, title:'タイトル１更新', content:'本文１更新' }
    ]).respond(500,'');

    scope.mainMemo = {id: 1, title:'タイトル１更新', content:'本文１更新' };
    scope.put();
    httpBackend.flush();
    expect(scope.status).toBe('error');
  });

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

});