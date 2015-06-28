MemoApp-UI
==========

AngularJSを利用したメモアプリです。REST API（[MemoApp-API](https://github.com/takushinohara/memoapp-api)）とセットで動作します。

＜前提条件＞  
・Node.jsをインストール済み  
・grunt-cliをインストール済み（ $ npm install -g grunt-cli ）  
・Compassをインストール済み（ $ gem install compass ）  

## Usage
```
$ git clone https://github.com/takushinohara/memoapp-ui.git
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
