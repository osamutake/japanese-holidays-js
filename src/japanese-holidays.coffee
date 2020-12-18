###

    日本の休日を JavaScript で計算するためのライブラリ
                         Osamu Takeuchi <osamu@big.jp>

###

"use strict"

# 元の時刻から指定時間だけずらした時刻を生成して返す
shiftDate = (date, year, mon, day, hour, min, sec, msec) ->
    # まずは日付以下の部分を msec に直して処理する
    res = new Date(2000,0,1)
    res.setTime( date.getTime() + 
        (((( day ? 0 ) * 24 + ( hour ? 0 )) * 60 + ( min ? 0 )) * 60 + 
                                ( sec ? 0 )) * 1000 + ( msec ? 0 )
    )
    # 年と月はちょっと面倒な処理になる
    res.setFullYear res.getFullYear() + ( year ? 0 ) + 
       Math.floor( ( res.getMonth() + ( mon ? 0 ) ) / 12 )
    res.setMonth ( ( res.getMonth() + ( mon ? 0 ) ) % 12 + 12 ) % 12
    return res

u2j = (d) -> shiftDate(d,0,0,0,+9)
j2u = (d) -> shiftDate(d,0,0,0,-9)
uDate = (y,m,d) -> new Date(Date.UTC(y,m,d))
jDate = (y,m,d) -> j2u uDate(y,m,d)
getJDay = (d) -> (u2j d).getUTCDay()
getJDate = (d) -> (u2j d).getUTCDate()
getJMonth = (d) -> (u2j d).getUTCMonth()
getJFullYear = (d) -> (u2j d).getUTCFullYear()
getJHours = (d) -> (u2j d).getUTCHours()
getJMinutes = (d) -> (u2j d).getUTCMinutes()

###
    ヘルパ関数
###

# 年を与えると指定の祝日を返す関数を作成
simpleHoliday = (month, day) ->
    (year) -> jDate(year, month-1, day)


# 年を与えると指定の月の nth 月曜を返す関数を作成
happyMonday = (month, nth) ->
    (year) ->
        monday = 1
        first = jDate(year, month-1, 1)
        shiftDate( first, 0, 0,
            ( 7 - ( getJDay(first) - monday ) ) % 7 + ( nth - 1 ) * 7
        )


# 年を与えると春分の日を返す
shunbunWithTime = (year) ->
    new Date(-655866700000 + 31556940400 * (year-1949) )

shunbun = (year) ->
    date = shunbunWithTime(year)
    jDate(year, getJMonth(date), getJDate(date))


# 年を与えると秋分の日を返す
shubunWithTime = (year) ->
    if day = { 1603: 23, 2074: 23, 2355: 23, 2384: 22 }[year]
      jDate(year, 9-1, day)
    else
      new Date(-671316910000 + 31556910000 * (year-1948) )

shubun = (year) ->
    date = shubunWithTime(year)
    jDate(year, getJMonth(date), getJDate(date))

###
    休日定義
    https://ja.wikipedia.org/wiki/%E5%9B%BD%E6%B0%91%E3%81%AE%E7%A5%9D%E6%97%A5
###

definition = [
    [ "元日",                     simpleHoliday( 1,  1), 1949       ],
    [ "成人の日",                 simpleHoliday( 1, 15), 1949, 1999 ],
    [ "成人の日",                 happyMonday(   1,  2), 2000       ],
    [ "建国記念の日",             simpleHoliday( 2, 11), 1967       ],
    [ "天皇誕生日",               simpleHoliday( 2, 23), 2020       ],
    [ "昭和天皇の大喪の礼",       simpleHoliday( 2, 24), 1989, 1989 ],
    [ "春分の日",                 shunbun,               1949       ],
    [ "皇太子明仁親王の結婚の儀", simpleHoliday( 4, 10), 1959, 1959 ],
    [ "天皇誕生日",               simpleHoliday( 4, 29), 1949, 1988 ],
    [ "みどりの日",               simpleHoliday( 4, 29), 1989, 2006 ],
    [ "昭和の日",                 simpleHoliday( 4, 29), 2007       ],
    [ "即位の日",                 simpleHoliday( 5,  1), 2019, 2019 ],
    [ "憲法記念日",               simpleHoliday( 5,  3), 1949       ],
    [ "みどりの日",               simpleHoliday( 5,  4), 2007       ],
    [ "こどもの日",               simpleHoliday( 5,  5), 1949       ],
    [ "皇太子徳仁親王の結婚の儀", simpleHoliday( 6,  9), 1993, 1993 ],
    [ "海の日",                   simpleHoliday( 7, 20), 1996, 2002 ],
    [ "海の日",                   happyMonday(   7,  3), 2003, 2019 ],
    [ "海の日",                   simpleHoliday( 7, 23), 2020, 2020 ],
    [ "海の日",                   simpleHoliday( 7, 22), 2021, 2021 ],
    [ "海の日",                   happyMonday(   7,  3), 2022       ],
    [ "山の日",                   simpleHoliday( 8, 11), 2016, 2019 ],
    [ "山の日",                   simpleHoliday( 8, 10), 2020, 2020 ],
    [ "山の日",                   simpleHoliday( 8,  8), 2021, 2021 ],
    [ "山の日",                   simpleHoliday( 8, 11), 2022       ],
    [ "敬老の日",                 simpleHoliday( 9, 15), 1966, 2002 ],
    [ "敬老の日",                 happyMonday(   9,  3), 2003       ],
    [ "秋分の日",                 shubun,                1948       ],
    [ "体育の日",                 simpleHoliday(10, 10), 1966, 1999 ],
    [ "体育の日",                 happyMonday(  10,  2), 2000, 2019 ],
    [ "スポーツの日",             simpleHoliday( 7, 24), 2020, 2020 ],
    [ "スポーツの日",             simpleHoliday( 7, 23), 2021, 2021 ],
    [ "スポーツの日",             happyMonday(  10,  2), 2022       ],
    [ "即位礼正殿の儀",           simpleHoliday(10, 22), 2019, 2019 ],
    [ "文化の日",                 simpleHoliday(11,  3), 1948       ],
    [ "即位礼正殿の儀",           simpleHoliday(11, 12), 1990, 1990 ],
    [ "勤労感謝の日",             simpleHoliday(11, 23), 1948       ],
    [ "天皇誕生日",               simpleHoliday(12, 23), 1989, 2018 ],
]


# 休日を与えるとその振替休日を返す
# 振り替え休日がなければ null を返す
furikaeHoliday = (holiday) ->
    # 振替休日制度制定前 または 日曜日でない場合 振り替え無し
    sunday = 0
    if holiday < jDate(1973, 4-1, 30-1) or getJDay(holiday) != sunday
        return null
    # 日曜日なので一日ずらす
    furikae = shiftDate(holiday, 0, 0, 1)
    # ずらした月曜日が休日でなければ振替休日
    if !isHolidayAt(furikae, false)
        return furikae
    # 旧振り替え制度では１日以上ずらさない
    if holiday < jDate(2007, 1-1,  1)
        return null # たぶんこれに該当する日はないはず？
    loop
        # 振り替えた結果が休日だったら１日ずつずらす
        furikae = shiftDate(furikae, 0, 0, 1)
        if !isHolidayAt(furikae, false)
            return furikae


# 休日を与えると、翌日が国民の休日かどうかを判定して、
# 国民の休日であればその日を返す
kokuminHoliday = (holiday) ->
    if getJFullYear(holiday) < 1988 # 制定前
        return null
    # ２日後が振り替え以外の祝日か
    if !isHolidayAt(shiftDate(holiday, 0, 0, 2), false)
        return null
    sunday = 0
    monday = 1
    kokumin = shiftDate(holiday, 0, 0, 1)
    if isHolidayAt(kokumin, false) or # 次の日が祝日
       getJDay(kokumin)==sunday or  # 次の日が日曜
       getJDay(kokumin)==monday     # 次の日が月曜（振替休日になる）
        return null
    return kokumin


# 計算結果をキャッシュする
#
# holidays[furikae] = {
#    1999:
#      "1,1": "元旦"
#      "1,15": "成人の日"
#      ...
# }
#
holidays = { true: {}, false: {} }

getHolidaysOf = (y, furikae) ->
    # キャッシュされていればそれを返す
    furikae = if !furikae? or furikae then true else false
    cache = holidays[furikae][y]
    return cache if cache?
    # されてなければ計算してキャッシュ
    # 振替休日を計算するには振替休日以外の休日が計算されて
    # いないとダメなので、先に計算する
    wo_furikae = {}
    for entry in definition
        continue if entry[2]? && y < entry[2]   # 制定年以前
        continue if entry[3]? && entry[3] < y   # 廃止年以降
        holiday = entry[1](y)                   # 休日を計算
        continue unless holiday?                # 無効であれば無視
        m = getJMonth(holiday) + 1              # 結果を登録
        d = getJDate(holiday)
        wo_furikae[ [m,d] ] = entry[0]
    holidays[false][y] = wo_furikae
    
    # 国民の休日を追加する
    kokuminHolidays = []
    for month_day of wo_furikae
        month_day = month_day.split(",")
        holiday = kokuminHoliday( jDate(y, month_day[0]-1, month_day[1] ) )
        if holiday?
            m = getJMonth(holiday) + 1          # 結果を登録
            d = getJDate(holiday)
            kokuminHolidays.push([m,d])
    for holiday in kokuminHolidays
        wo_furikae[holiday] = "国民の休日"
    
    # 振替休日を追加する
    w_furikae = {}
    for month_day, name of wo_furikae
        w_furikae[month_day] = name
        month_day = month_day.split(",")
        holiday = furikaeHoliday( jDate(y, month_day[0]-1, month_day[1] ) )
        if holiday?
            m = getJMonth(holiday) + 1          # 結果を登録
            d = getJDate(holiday)
            w_furikae[ [m,d] ] = "振替休日"
    holidays[true][y] = w_furikae               # 結果を登録
    return holidays[furikae][y]

###
    クラス定義
###

target = (module?.exports ? this.JapaneseHolidays={})

target.getHolidaysOf = (y, furikae) ->
    # データを整形する
    result = []
    for month_day, name of getHolidaysOf(y, furikae)
        result.push(
            month : parseInt(month_day.split(",")[0])
            date  : parseInt(month_day.split(",")[1])
            name  : name
        )
    # 日付順に並べ直す
    result.sort( (a,b)-> (a.month-b.month) or (a.date-b.date) )
    result

isHoliday = (date, furikae) ->
    getHolidaysOf(date.getFullYear(), furikae)[ [date.getMonth()+1, date.getDate()] ]

isHolidayAt = (date, furikae) ->
    getHolidaysOf(getJFullYear(date), furikae)[ [getJMonth(date)+1, getJDate(date)] ]

target.isHoliday = isHoliday
target.isHolidayAt = isHolidayAt

target.shiftDate = shiftDate
target.u2j = u2j
target.j2u = j2u
target.jDate = jDate
target.uDate = uDate
target.getJDay = getJDay
target.getJDate = getJDate
target.getJMonth = getJMonth
target.getJFullYear = getJFullYear
target.getJHours = getJHours
target.getJMinutes = getJMinutes

target.__forTest = {
    shunbunWithTime: shunbunWithTime
    shubunWithTime: shubunWithTime
  }
