/*
  japanese.holiday.js と比較する
  https://gist.github.com/Songmu/703311/ee19179d22d58ba1e6cd11b71c0de84684fc03ae
  
  japanese.holiday.js は Songmu さんが gist へ公開している著作物です
  テスト用に少しだけ改変して取り込ませていただいています
*/

var assert = require('assert');
var Holidays = require('../lib/japanese-holidays.min.js');

/////////////////////////////////////////////////////// ここから japanese.holiday.js

//祝日を求めるjavascript 昔書いたやつ
// Ported From Calendar::Japanese::Holiday.pm

"use strict"

var FurikaeStr = '振替休日';
var staticHolidays = [
// 天皇誕生日が 2/23 に移行
  {
    'start' : 2022,
    'end'   : 2999,
    'days'  : {
      1  : { 1 : '元日'},
      2  : {
	    11 : '建国記念の日',
		23 : '天皇誕生日',
	  },
      4  : {29 : '昭和の日'},
      5  : {
        3 : '憲法記念日',
        4  : 'みどりの日',
        5 : 'こどもの日'
      },
	  8  : {11 : '山の日'},
      11 : {
        3 : '文化の日',
        23 : '勤労感謝の日'
      }
    }
  },
  //オリンピック延期に伴い特別措置法等の一部が改正
  {
    'start' : 2021,
    'end'   : 2021,
    'days'  : {
      1  : { 1 : '元日'},
      2  : {
	    11 : '建国記念の日',
		23 : '天皇誕生日',
	  },
      4  : {29 : '昭和の日'},
      5  : {
        3 : '憲法記念日',
        4  : 'みどりの日',
        5 : 'こどもの日'
      },
	  7  : {
	   22 : '海の日',
	   23 : 'スポーツの日'
	  },
	  8  : {8 : '山の日'},
      11 : {
        3 : '文化の日',
        23 : '勤労感謝の日'
      }
    }
  },
// 天皇誕生日が 2/23 に移行
  {
    'start' : 2020,
    'end'   : 2020,
    'days'  : {
      1  : { 1 : '元日'},
      2  : {
	    11 : '建国記念の日',
		23 : '天皇誕生日',
	  },
      4  : {29 : '昭和の日'},
      5  : {
        3 : '憲法記念日',
        4  : 'みどりの日',
        5 : 'こどもの日'
      },
	  7  : {
	   23 : '海の日',
	   24 : 'スポーツの日'
	  },
	  8  : {10 : '山の日'},
      11 : {
        3 : '文化の日',
        23 : '勤労感謝の日'
      }
    }
  },
// 天皇誕生日がない
  {
    'start' : 2019,
    'end'   : 2019,
    'days'  : {
      1  : { 1 : '元日'},
      2  : {11 : '建国記念の日'},
      4  : {29 : '昭和の日'},
      5  : {
        3 : '憲法記念日',
        4  : 'みどりの日',
        5 : 'こどもの日'
      },
	  8  : {11 : '山の日'},
      11 : {
        3 : '文化の日',
        23 : '勤労感謝の日'
      }
    }
  },
// 4/29 みどりの日 : 昭和の日 変更
// みどりの日は5/4に移行
  {
    'start' : 2016,
    'end'   : 2018,
    'days'  : {
      1  : { 1 : '元日'},
      2  : {11 : '建国記念の日'},
      4  : {29 : '昭和の日'},
      5  : {
        3 : '憲法記念日',
        4  : 'みどりの日',
        5 : 'こどもの日'
      },
	  8  : {11 : '山の日'},
      11 : {
        3 : '文化の日',
        23 : '勤労感謝の日'
      },
      12 : {23 : '天皇誕生日'}
    }
  },
// 4/29 みどりの日 : 昭和の日 変更
// みどりの日は5/4に移行
  {
    'start' : 2007,
    'end'   : 2015,
    'days'  : {
      1  : { 1 : '元日'},
      2  : {11 : '建国記念の日'},
      4  : {29 : '昭和の日'},
      5  : {
        3 : '憲法記念日',
        4  : 'みどりの日',
        5 : 'こどもの日'
      },
      11 : {
        3 : '文化の日',
        23 : '勤労感謝の日'
      },
      12 : {23 : '天皇誕生日'}
    }
  },
// 海の日,敬老の日がHappy Mondayに
  {
    'start' : 2003,
    'end'   : 2006,
    'days'  : {
      1  : { 1 : '元日'},
      2  : {11 : '建国記念の日'},
      4  : {29 : 'みどりの日'},
      5  : {
        3 : '憲法記念日',
        5 : 'こどもの日'
      },
      11 : {
        3 : '文化の日',
        23 : '勤労感謝の日'
      },
      12 : {23 : '天皇誕生日'}
    }
  },
// 成人の日,体育の日がHappy Mondayに
  {
    'start' : 2000,
    'end'   : 2002,
    'days'  : {
      1  : { 1 : '元日'},
      2  : {11 : '建国記念の日'},
      4  : {29 : 'みどりの日'},
      5  : {
        3 : '憲法記念日',
        5 : 'こどもの日'
      },
      7  : {20 : '海の日'},
      9  : {15 : '敬老の日'},
      11 : {
        3 : '文化の日',
        23 : '勤労感謝の日'
      },
      12 : {23 : '天皇誕生日'}
    }
  },
// 海の日追加
  {
    'start' : 1996,
    'end'   : 1999,
    'days'  : {
      1  : {
        1 : '元日',
        15 : '成人の日'
      },
      2  : {11 : '建国記念の日'},
      4  : {29 : 'みどりの日'},
      5  : {
        3 : '憲法記念日',
        5 : 'こどもの日'
      },
      7  : {20 : '海の日'},
      9  : {15 : '敬老の日'},
      10 : {10 : '体育の日'},
      11 : {
        3  : '文化の日',
        23 : '勤労感謝の日'
      },
      12 : {23 : '天皇誕生日'}
    }
  },
// 天皇誕生日変更 4/29 : 12/23
// 旧天皇誕生日をみどりの日に変更
  {
    'start' : 1989,
    'end'   : 1995,
    'days'  : {
      1  : {
        1 : '元日',
        15 : '成人の日'
      },
      2  : {11 : '建国記念の日'},
      4  : {29 : 'みどりの日'},
      5  : {
        3 : '憲法記念日',
        5 : 'こどもの日'
      },
      9  : {15 : '敬老の日'},
      10 : {10 : '体育の日'},
      11 : {
        3 : '文化の日',
        23 : '勤労感謝の日'
      },
      12 : {23 : '天皇誕生日'}
    }
  },
  // 建国記念の日追加
  {
    'start' : 1967,
    'end'   : 1988,
    'days'  : {
      1  : {
        1 : '元日',
        15 : '成人の日'
      },
      2  : {11 : '建国記念の日'},
      4  : {29 : '天皇誕生日'},
      5  : {
        3 : '憲法記念日',
        5 : 'こどもの日'
      },
      9  : {15 : '敬老の日'},
      10 : {10 : '体育の日'},
      11 : {
        3 : '文化の日',
        23 : '勤労感謝の日'
      }
    }
  },
  // 敬老の日,体育の日追加
  {
    'start' : 1966,
    'end'   : 1966,
    'days' : {
      1  : {
        1  : '元日',
        15 : '成人の日'
      },
      4  : {29 : '天皇誕生日'},
      5  : {
        3 : '憲法記念日',
        5 : 'こどもの日'
      },
      9  : {15 : '敬老の日'},
      10 : {10 : '体育の日'},
      11 : {
        3 : '文化の日',
        23 : '勤労感謝の日'
      }
    }
  },
  // 国民の祝日に関する法律に定められた祝日のうち7/20以前のものを追加
  {
    'start' : 1949,
    'end'   : 1965,
    'days'  : {
      1  : {
        1 : '元日',
        15 : '成人の日'
      },
      4  : {29 : '天皇誕生日'},
      5  : {
        3 : '憲法記念日',
        5 : 'こどもの日'
      },
      11 : {
        3 : '文化の日',
        23 : '勤労感謝の日'
      }
    }
  },
// 国民の祝日に関する法律 1948/7/20制定
  {
    'start' : 1948,
    'end'   : 1948,
    'days'  : {
      11 : {
        3 : '文化の日',
        23 : '勤労感謝の日'
      }
    }
  }
];

var ExceptionalHolidays = {
  195904 : {10 : '皇太子明仁親王の結婚の儀'},
  198902 : {24 : '昭和天皇の大喪の礼'},
  199011 : {12 : '即位礼正殿の儀'},
  199306 : { 9 : '皇太子徳仁親王の結婚の儀'},
  201905 : { 1 : '即位の日'},
  201910 : {22 : '即位礼正殿の儀'}
  
};

var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function days_in_month(year, month) {
  var days = daysInMonth[month - 1];

  if (month == 2 && year % 4 == 0) {
    if (year % 100 == 0) {
      if (year % 400 == 0) {return days + 1;}
      return days;
    }
    return days + 1;
  }
  return days;
}

// 指定曜日の日付一覧を配列で返す
function weekdays(year, mon, wday) {
  var week_days = [];
  var wd = (new Date(year, mon-1, 1)).getDay();
  // 指定曜日の最初の日付(カレンダー的に空欄の場合は0以下の値となる)
  var start = 1 - wd + wday;
  var last_day = days_in_month(year, mon);

  for (var day = start ; day <= last_day ; day += 7) {
    if (day > 0) {
      week_days.push(day);
    }
  }
  return week_days;
}

function lookup_holiday_table(year) {//参照が返るので注意
  for (var i = 0; i < staticHolidays.length; i++) {
    if (staticHolidays[i].start <= year && year <= staticHolidays[i].end) {
      return staticHolidays[i].days;
    }
  }
  return false;
}

// 春分の日
// Ref to.
//   http://www.nao.ac.jp/QA/faq/a0301.html
//   http://ja.wikipedia.org/wiki/%E6%98%A5%E5%88%86%E3%81%AE%E6%97%A5
function shunbun_day(year) {
  var day;

  var mod = year % 4;
  if (mod == 0) {
    if      (1900 <= year && year <= 1956) {day = 21;}
    else if (1960 <= year && year <= 2088) {day = 20;}
    else if (2092 <= year && year <= 2096) {day = 19;}
  } else if (mod == 1) {
    if      (1901 <= year && year <= 1989) {day = 21;}
    else if (1993 <= year && year <= 2097) {day = 20;}
  } else if (mod == 2) {
    if      (1902 <= year && year <= 2022) {day = 21;}
    else if (2026 <= year && year <= 2098) {day = 20;}
  } else if (mod == 3) {
    if      (1903 <= year && year <= 1923) {day = 22;}
    else if (1927 <= year && year <= 2055) {day = 21;}
    else if (2059 <= year && year <= 2099) {day = 20;}
  }
  return day;
}

// 秋分の日
function shuubun_day(year) {
  var day;

  var mod = year % 4;
  if (mod == 0) {
    if      (year == 1900)                 {day = 23;}
    else if (1904 <= year && year <= 2008) {day = 23;}
    else if (2012 <= year && year <= 2096) {day = 22;}
  } else if (mod == 1) {
    if      (1901 <= year && year <= 1917) {day = 24;}
    else if (1921 <= year && year <= 2041) {day = 23;}
    else if (2045 <= year && year <= 2097) {day = 22;}
  } else if (mod == 2) {
    if      (1902 <= year && year <= 1946) {day = 24;}
    else if (1950 <= year && year <= 2074) {day = 23;}
    else if (2078 <= year && year <= 2098) {day = 22;}
  } else if (mod == 3) {
    if      (1903 <= year && year <= 1979) {day = 24;}
    else if (1983 <= year && year <= 2099) {day = 23;}
  }
  return day;
}

function get_furikae_days(year, mon, holidays_tbl){
  var days = {};
  if (year < 1973) { return days; }

  for (var h_day in holidays_tbl) {
    h_day = parseInt(h_day);
    var name = holidays_tbl[h_day];
    // 祝日が日曜日かチェック
    var wday = (new Date(year, mon-1, h_day)).getDay();
    if (wday == 0) {
      var furikae_day = h_day + 1;
      if (year >= 2007) {
        // 振り替えた先も祝日ならさらに進める
        while(holidays_tbl[furikae_day]){furikae_day++;}
        days[furikae_day] = name;
      }
      else if(!holidays_tbl[furikae_day]){
        days[furikae_day] = name;
      }
    }
  }
    return days;
}

function getHolidays(year, mon, furikae) {
  var holiday_tbl = lookup_holiday_table(year);
  //祝日を見に行く 該当が無ければ抜ける。
  if (!holiday_tbl){ return false; }

  var holidays = _clone(holiday_tbl[mon]);

  // Happy Monday (成人の日、海の日、敬老の日、体育の日)
  var mondays = weekdays(year, mon, 1);  // 月曜日の一覧

  if (year >= 2000) {
    if (mon == 1) {holidays[mondays[1]] = '成人の日';}
  }
  if ((year >= 2000)&&(year <= 2019)) {
    if (mon == 10){holidays[mondays[1]] = '体育の日';}
  }
  if (year >= 2022) {
    if (mon == 10){holidays[mondays[1]] = 'スポーツの日';}
  }
  if (year >= 2003) {
    if (mon == 9) {holidays[mondays[2]] = '敬老の日';}
  }
  if ((year >= 2003)&&(year != 2020)&&(year != 2021)) {
    if (mon == 7) {holidays[mondays[2]] = '海の日';}
  }
  // 不定なもの
  if (mon == 3) {holidays[shunbun_day(year)] = '春分の日';}
  if (mon == 9) {holidays[shuubun_day(year)] = '秋分の日';}

  // 例外的なもの
  var yymm = year;
  if (mon < 10){
    yymm += "" + "0";
  }
  yymm += "" + mon;
  if (ExceptionalHolidays[yymm]) {
    for (var day in ExceptionalHolidays[yymm]){
      holidays[day] = ExceptionalHolidays[yymm][day];
    }
  }
  // 国民の休日
  if (year >= 1986) {
  // 祝日に挟まれた平日を探す (祝日A - 平日B - 祝日C)
    for(var day in holidays) {
      day = parseInt(day);
      if ( holidays[day + 2] && !holidays[day + 1]) {
        var wday =  (new Date(year, mon-1, day)).getDay();
        // Aが日曜の時は平日Bはただの振り替え休日
        // Bが日曜の場合も国民の休日とはならない
        if(wday == 0 || wday == 6){
          continue;
        }
        holidays[day + 1] = '国民の休日';
      }
    }
  }
  // 振り替え休日も含める
  if (furikae) {
    var furikae_days = get_furikae_days(year, mon, holidays);

    for (var val in furikae_days) {
      holidays[val] = FurikaeStr;
    }
  }
  return holidays;
}

var Cache_holidays_Year  = 0;
var Cache_holidays_Month = 0;
var Cache_holidays;

function isHoliday(year, mon, day, furikae){
  var holidays;

  if (year == Cache_holidays_Year && mon  == Cache_holidays_Month){
    holidays = Cache_holidays;  // From Cache
  } else {
    holidays = getHolidays(year, mon, 1);
    if (!holidays) {
      return false;
    }
    // Cache
    Cache_holidays       = holidays;
    Cache_holidays_Year  = year;
    Cache_holidays_Month = mon;
  }
  if (!holidays[day]){ return false; }

  if (!furikae && holidays[day] == FurikaeStr){ return false; }

  return holidays[day];
}

function _clone(obj){//shallow copy
  var result = {};
  for(var i in obj){
    result[i] = obj[i];
  }
  return result;
}

/////////////////////////////////////////////////////// ここまで japanese.holiday.js

for(var y=1949; y<2100; y++){
  // japanese.holiday.js の祝日が正しく祝日として判定されること
  for(var m=1; m<=12; m++) {
    var h = getHolidays(y,m,true);
    Object.keys(h).forEach(function(d){

      // japanese.holiday.js のバグ
      if( (new Date(y,m-1,d)-new Date(1973,2-1,12)==0) || // 振替休日法施行前
          (new Date(y,m-1,d)-new Date(2074,9-1,23)==0) || // 少しイレギュラーな秋分
          (new Date(y,m-1,d)-new Date(2074,9-1,24)==0))
        return;

      assert(Holidays.isHoliday(new Date(y,m-1,d))===h[d],
        new Date(y,m-1,d) + " " +
        Holidays.isHoliday(new Date(y,m-1,d))+ " " +h[d]);
    });
  }

  // 計算した祝日が japanese.holiday.js でも祝日であること
  Holidays.getHolidaysOf(y).forEach(function(h){
    var name = isHoliday(y, h.month, h.date, true);

    // 2074/9/23 の秋分が正しく計算されない
    if ( y==2074 && h.month==9 && h.date==23 && h.name=="秋分の日") 
      return;
	
	// japanese.holiday.js は月末の国民の休日を検出できない
	if ((y==2019) && (h.month==4) && (h.date==30))
	  return;

    assert( name === h.name,
            y+"/"+h.month+"/"+h.date+" "+name+" "+h.name);
  });
}
