'use strict';

describe('MemoApp Test', function () {
    var memos;

	beforeEach(function () {
	  browser.get('/#/');
	  memos = element.all(by.repeater('memo in memos'));
	});

	it('メモが表示できる', function() {
		// 初期表示時にメモが０件であることを確認
		expect(memos.count()).toEqual(0);
	});

});