/**
 * Created by 海枯 on 2017/9/3.
 */

let quitDat = ['08.10 01:00:00',
  '08.09 23:59:59',
  '08.10 17:00:00',
  '08.10 18:00:00',
  '08.01 01:00:00',
  '08.01 04:00:00',
  '08.03 10:00:00',
  '08.03 12:29:59',
  '08.04 10:00:00',
  '08.04 12:30:00',
  '08.07 01:00:00',
  '08.07 02:00:00']

let dayEnd, dayStart, restEnd, restStart

function compute(arr) {
  arr.sort()
  arr = arr.map((item) => {
    let sp = item.split(' ')
    let nextSpace = sp[1]
    return `2017-${sp[0].split('.')[0]}-${sp[0].split('.')[1]} ${nextSpace}`
  })

  let count = 0, total = 0

  let init = new Date(arr[0])
  let hour = init.getHours()
  if (hour < 3) {
    dayEnd = nextDayTs(init, 1)
    dayStart = prevDayTs(init, 1)
    restStart = prevRestTs(init, 1)
    restEnd = nextRestTs(init, 1)
  } else {
    dayStart = prevDayTs(init)
    dayEnd = nextDayTs(init)
    restStart = prevRestTs(init)
    restEnd = nextRestTs(init)
  }

  console.log(arr)

  arr.forEach((time, idx) => {
    if (idx > 0) {
      let cur = new Date(time)

      let prevEle = Date.parse(new Date(arr[idx - 1]))

      let ts = Date.parse(cur)
      if (ts <= dayEnd && ts >= dayStart) {
        count++
        operateTotal(prevEle, ts, restStart, restEnd, dayStart)
        if (idx == arr.length - 1 && count >= 2 && total > 0) {
          printResult(dayStart, total)
        }
      } else if (idx == arr.length - 1 && count >= 2) {
        operateTotal(prevEle, ts, restStart, restEnd, dayStart)
      } else {
        if (count >= 2 && total > 0) {
          printResult(dayStart, total)
        }

        let hour = cur.getHours()
        if (hour < 3) {
          dayEnd = nextDayTs(cur, 1)
          dayStart = prevDayTs(cur, 1)
          restStart = prevRestTs(cur, 1)
          restEnd = nextRestTs(cur, 1)
        } else {
          dayEnd = nextDayTs(cur)
          dayStart = prevDayTs(cur)
          restStart = prevRestTs(cur)
          restEnd = nextRestTs(cur)
        }
        count = 1
        total = 0
      }
    }

  })

  function printResult(dayStart, ans) {
    let datePrint = new Date(dayStart)
    let month = datePrint.getMonth() + 1
    let date = datePrint.getDate()
    console.log(`${month < 10 ? '0' + month : month}.${date < 10 ? '0' + date : date} ${ans / 1000}`)
  }

  function operateTotal(prevEle, currTs, restS, restE, dayStart) {
    // prev correct, next beyond rests and lt reste
    if (prevEle < restS && currTs > restS && currTs <= restE)
      total += restS - prevEle
    // prev correct, next beyond rests and reste
    else if (prevEle < restS && currTs > restE)
      total += restS - prevEle + (currTs - restE)
    // prev in rest
    else if (prevEle > restS && currTs > restE)
      total += currTs - restE
    // prev lt prevEle
    else if (prevEle < dayStart)
      total += currTs - dayStart
    else
      total += currTs - prevEle
  }

  function prevDayTs(dates, dec) {
    let m = dates.getMonth(),
      date = dates.getDate()
    let tmp = new Date(2017, m, dec ? date - dec : date, 3)
    return Date.parse(tmp)
  }

  function nextDayTs(dates, dec) {
    let m = dates.getMonth(),
      date = dates.getDate()
    let tmp = new Date(2017, m, (dec ? date - dec : date) + 1, 3)
    return Date.parse(tmp)
  }

  function prevRestTs(dates, dec) {
    let m = dates.getMonth(),
      date = dates.getDate()
    let tmp = new Date(2017, m, dec ? date - dec : date, 12, 30)
    return Date.parse(tmp)
  }

  function nextRestTs(dates, dec) {
    let m = dates.getMonth(),
      date = dates.getDate()
    let tmp = new Date(2017, m, dec ? date - dec + 1 : date + 1, 14)
    return Date.parse(tmp)
  }
}
// compute(quitDat)

function continueSubStr(str1, str2) {
  var acc = +str1.split(' ')[0]
  var k = +str1.split(' ')[1]
  if (k <= 0)
    return 0

  var arr = str2.split(' ')

  arr.forEach(function (e, idx) {
    arr[idx] = +e
  })

  var ans = acc
  var hash = {}
  var l = 0
  var r = 1
  while (l < acc && r < acc) {
    var curr = arr[r]
    if (curr in hash)
      hash[curr]++
    else
      hash[curr] = 1

    if (hash[curr] <= k) {
      console.log(`[${l}, ${r}]`)
      if (r + 1 >= acc) {
        ans += r - l
        l++
        r = l + 1
        hash = {}
        hash[arr[l]] = 1
      } else
        r++;
    } else {
      // 结算
      var n = r - l - 2
      ans += n * 2 + n * (n - 1) / 2 + 1
      // reset
      l = r
      r = l + 1
      hash = {}
      hash[arr[l]] = 1
    }
  }
  console.log(ans)
}
continueSubStr('4 1', '1 2 2 3')
// continueSubStr('7 1', '1 2 3 4 4 5 6')

function maxNum(str, replace) {
  var arr = replace.split(' ')
  arr.sort(function (a, b) {
    return +b - +a
  })
  var ans = ''
  for (var i = str.length - 1; i >= 0; i--) {
    var radixNum = Math.floor(+str / Math.pow(10, i) % 10)
    // var j = 0
    if (radixNum <= +arr[0]) {
      ans += arr[0]
      arr.shift()
    } else
      ans += radixNum.toString()
  }
  console.log(ans)
}
// maxNum('9001', '0 1 2')