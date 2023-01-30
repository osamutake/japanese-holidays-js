# japanese-holidays-js [![Build Status](https://travis-ci.org/osamutake/japanese-holidays-js.svg?branch=master)](https://travis-ci.org/osamutake/japanese-holidays-js)

[![NPM](https://nodei.co/npm/japanese-holidays.png?downloads=true&downloadRank=true)](https://www.npmjs.com/package/japanese-holidays)


日本の休日を JavaScript で計算するためのライブラリです。

ソースは coffeescript で書かれており、それをコンパイルした物が lib に入っています。
ご利用の際には lib 内の japanese-holidays.js や japanese-holidays.min.js を使ってください。

lib/ 以下のファイルは自動生成された物です。これらを編集しないようにしてください。

## Use with Node

    $ npm install japanese-holidays

## Use on the Web

    <script src="https://cdn.jsdelivr.net/gh/osamutake/japanese-holidays-js@v1.0.10/lib/japanese-holidays.min.js"></script>

# 使い方

### JapaneseHolidays.isHoliday(date, furikae = true)

指定された日が休日かどうかを判定して、休日ならその名前を返します。

休日でなければ undefined を返します。

furikae に false を指定すると振替休日を除きます。

内部ではキャッシュした値を使って計算するため繰り返し呼ぶ際にはとても高速に動作します。

Node:
```javascript
// デバッグ用のソースマップサポート
// 例外発生時に CoffeeScript の行番号を出すことができる
require('source-map-support').install();

// ここからが本文
var JapaneseHolidays = require('japanese-holidays');

var today = new Date();
var holiday = JapaneseHolidays.isHoliday(today);
if(holiday) {
    console.log("今日は " + holiday + " です");
} else {
    console.log("今日は祝日ではありません");
}
```

On the web:
```javascript
<script src="https://cdn.jsdelivr.net/gh/osamutake/japanese-holidays-js@v1.0.10/lib/japanese-holidays.min.js"></script>
<script>
var today = new Date();
var holiday = JapaneseHolidays.isHoliday(today);
if(holiday) {
    alert("今日は " + holiday + " です");
} else {
    alert("今日は祝日ではありません");
}
</script>
```

### JapaneseHolidays.getHolidaysOf(year, furikae = true)
    
指定された年の休日を配列にして返します。

配列には {month: m, date: d, name: s} の形で表わされた休日が日付順に並びます。

furikae に false を指定すると、振替休日および国民の休日を除きます。

Node:
```javascript
// デバッグ用のソースマップサポート
// 例外発生時に CoffeeScript の行番号を出すことができる
require('source-map-support').install();

// ここからが本文
var JapaneseHolidays = require('japanese-holidays');

var today = new Date();
var holidays = JapaneseHolidays.getHolidaysOf( today.getFullYear() );
holidays.forEach(function(holiday) {
    console.log(
        today.getFullYear() + "年" +
        holiday.month + "月" + 
        holiday.date + "日は " +
        holiday.name + " です"
    );
});
```

On the web:
```javascript
<script src="https://cdn.jsdelivr.net/gh/osamutake/japanese-holidays-js@v1.0.10/lib/japanese-holidays.min.js"></script>
<script>
var today = new Date();
var holidays = JapaneseHolidays.getHolidaysOf( today.getFullYear() );
holidays.forEach(function(holiday) {
    document.write(
        today.getFullYear() + "年" +
        holiday.month + "月" + 
        holiday.date + "日は " +
        holiday.name + " です<br>"
    );
});
</script>

```

#### Properties

+ month: Integer - 月 (1～12)
+ date: Integer - 日 (1~31)
+ name: String - 休日名

## 春分・秋分の求め方について

春分・秋分の日は年によって日付が異なります。

この理由は、暦の上での１年の長さが閏年分だけ等間隔にならないため、
本来ほぼ正確に等間隔でやってくる春分・秋分の日付がカレンダー上でずれてしまうためです。
とはいえ、春分・秋分の間隔も完全に等間隔ではなく、毎年少しずつ揺れ動くようです。

Wikipedia の
[春分](https://ja.wikipedia.org/wiki/%E6%98%A5%E5%88%86) ・
[秋分](https://ja.wikipedia.org/wiki/%E7%A7%8B%E5%88%86)
のページに 1600年～2399年 のデータがあって、そこから周期を求めることで、
春分についてはすべての範囲で計算と実測とが一致しました。秋分については
ふらつきが大きいようで、計算だけではどうしても一致しなかったため、
いくつかの値についてのみ個別に指定しています。

結果として、1600年～2399年 の範囲で上記 Wikipedia のページにあった日付を
再現できています。

## タイムゾーンについて

```JapaneseHolidays.isHoliday``` は与えられた「時刻」ではなく「日付」を元に祝日を判定します。
例えばニュージーランドで

```javascript
    JapaneseHolidays.isHoliday(new Date(2016,3-1,8)); 
```

とすると、ニュージーランド時間の ```2016-03-08 00:00:00``` が関数に渡されます。
これは日本時間では ```2016-03-07 21:00:00``` を表しますが、
```isHoliday``` は与えられた日付 3/8 が休日かどうかを判定するということです。

多くの場合これは利用者の意図するところだと思います。

万一、与えた「時刻」において日本で休日かどうかを判定する必要があれば、

```javascript
    JapaneseHolidays.isHolidayAt(new Date(2016,3-1,8)); 
```

を呼んでください。例えばニュージーランドでこれを呼べば、3/7 が休日かどうかが判定されます。

## License

MIT

## ChangeLog


* 2019-02-15 : 1.0.7
  * 2019年の改元に伴う休日設定＆変更に対応しました
* 2019-02-21 : 1.0.8
  * 2020年のオリンピック特例に対応しました
  * スポーツの日に対応しました
* 2019-09-03 : 1.0.9
  * minify 版が壊れていたのを直しました
* 2021-06-29 : 1.0.10
  * 2020年のオリンピック特例に対応しました
  * スポーツの日に対応しました

