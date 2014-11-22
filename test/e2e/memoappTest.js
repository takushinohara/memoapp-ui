'use strict';

describe('MemoApp Test', function () {
  var memos;
  var addBotton;
  var putBotton;
  var deleteBotton;
  var title;
  var content;
  var search;
  var searchTitle;
  var searchContent;
  var testTitle;
  var testContent;

  beforeEach(function () {
    browser.get('/#/');
    memos         = element.all(by.repeater('memo in memos'));
    addBotton     = element(by.className('btn-default'));
    putBotton     = element(by.className('btn-success'));
    deleteBotton  = element(by.className('btn-danger'));
    title         = element(by.model('mainMemo.title'));
    content       = element(by.model('mainMemo.content'));
    search        = element(by.model('search'));
    searchTitle   = ['あ','い','う','え','お'];
    searchContent = ['A','B','C','D','E'];
    testTitle     = 'タイトルテスト８９０１２３４５６７８９';
    testContent   = '本文テスト６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９';
  });

  it('メモが表示できる', function () {
    // 初期表示時にメモが０件であることを確認
    expect(memos.count()).toEqual(0);
  });

  it('メモが追加できる', function () {
    // メモが追加できることを確認
    for (var i = 0; i < 5; i++) {
      addBotton.click();

      expect(memos.count()).toEqual(i + 1);
    }
  });

  it('メモが更新できる', function () {
    // すべてのメモが更新できることを確認
    for (var i = 0; i < 5; i++) {
      memos.get(i).click();
      title.clear();
      title.sendKeys(testTitle + searchTitle[i]);
      content.sendKeys(testContent + searchContent[i]);
      putBotton.click();
      memos.get(i).click();

      expect(title.getAttribute('value')).toEqual(testTitle + searchTitle[i]);
      expect(content.getAttribute('value')).toEqual(testContent + searchContent[i]);
    }
  });

  it('メモが検索できる', function () {
    // タイトルが検索できることを確認
    for (var i = 0; i < 5; i++) {
      search.clear();
      search.sendKeys(searchTitle[i]);
      memos.get(0).click();

      expect(title.getAttribute('value')).toEqual(testTitle + searchTitle[i]);
      expect(content.getAttribute('value')).toEqual(testContent + searchContent[i]);
    }
    // 本文が検索できることを確認
    for (var i = 0; i < 5; i++) {
      search.clear();
      search.sendKeys(searchContent[i]);
      memos.get(0).click();

      expect(title.getAttribute('value')).toEqual(testTitle + searchTitle[i]);
      expect(content.getAttribute('value')).toEqual(testContent + searchContent[i]);
    }
  })

  it('メモが削除できる', function () {
    // すべてのメモが削除できることを確認
    for (var i = 0; 4 - i >= 0; i++) {
      memos.get(4 - i).click();
      deleteBotton.click();

      expect(memos.count()).toEqual(4 - i);
    }
  });

});