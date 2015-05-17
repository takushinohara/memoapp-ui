MemoApp-UI
==========

AngularJSを利用したメモアプリです。REST API（[MemoApp-API](https://github.com/takushinohara/memoapp-api)）とセットで動作します。

## Usage
```
$ git clone https://github.com/t-shinohara/memoapp-ui.git
$ cd memoapp-ui
$ npm install
$ bower install
$ grunt serve
```
### Unit Test
```
$ grunt karma:unit
```

### E2E Test
grunt serve を実行した状態で、Selenium Serverを起動します。
```
$ node_modules/protractor/bin/webdriver-manager update
$ node_modules/protractor/bin/webdriver-manager start
```
別コンソールで、以下のコマンドを実行します。
```
$ grunt protractor:e2e
```
