/**
 * Created by 海枯 on 2017/9/4.
 */
/*for (var i = 0; i < 3; i++) {
 setTimeout(function () {
 console.log(i)
 },(function () {
 var b = i * 1000
 console.log(b);
 return b;
 })())
 }*/
/*console.log(!!(0 == false))
 console.log(!!(0 == undefined))

 console.log(["1", "2", "3"].map(parseInt))

 var a = 1
 function test() {
 console.log(a)
 a = 2
 console.log(a)
 console.log(this.a)
 }
 test()

 var str = "com.meitu.mtxx/6.8.0(ios10.2)/lang:zh"
 console.log(str.match(/[\d.]+(?=\()/)[0])*/

function whereStrIn(strings, datas) {
  var cdata = datas.length
  var continous = 1
  for (var a = 0; a < strings.length && continous; a++) {
    var curStr = strings[a]
    var idx = curStr.indexOf(datas[0])
    if (idx == -1)
      continue
    if (cdata == 1)
      continous = 0
    for (var b = 1; b < cdata; b++) {
      var tmp = curStr.indexOf(datas[b])
      if (tmp == -1) {
        break
      } else if (tmp != -1)
        continous = 0
    }
  }
  console.log(a)
}

// whereStrIn(['aaa', 'aaa', 'baa'], ['aa', 'ba'])

function shuffleCards(rel, datas) {
  var n = +rel[0]
  var once = +rel[1]
  var ans = []

  var i = 0
  while (i++ < once) {
    for (var j = 0; j < n; j++) {
      ans[2 * j] = datas[j]
      ans[2 * j + 1] = datas[n + j]
    }
    datas = ans.slice()
  }
  console.log(ans.join(' '))
}
/*
shuffleCards(['3', '1'], ['1', '2', '3', '4', '5', '6'])
shuffleCards(['3', '2'], ['1', '2', '3', '4', '5', '6'])
shuffleCards(['2', '2'], ['1', '1','1','1'])
shuffleCards(['10', '49'], [384329296,939151343,104794929 ,144759741 ,670973514 ,615219401 ,6195949 ,494573296 ,531671982, 924524885, 445556150, 979714539, 305135424, 13100710, 933279554, 201884968 ,849473494 ,629728402 ,45839998 ,279195691])*/

/*function fun(n, o) {
  console.log(o)
  return {
    fun: function (m) {
      return fun(m, n)
    }
  }
}
var a = fun(0).fun(1).fun(2).fun(3)*/

function hefaku(str) {
  // var stack = []
  var max = 0, tmp = str[0] == '(' ? 1 : 0
  for (let i = 1; i < str.length; i++) {
    let cur = str[i]
    if (str[i-1] == '(' && cur == '(') {
      tmp++
    } else {
      if (max < tmp) {
        max = tmp
        tmp = 0
      }
    }
    if (max < tmp) {
      max = tmp
    }
  }
  var ans = 1
  for (var j = max; j > 0;j--)
    ans *= j
  console.log(ans)
}
// hefaku('((()))')

function continusMuch(m, c, maps) {
  var ans = 0
  var tmp = 0
  var start = 0
  var exist
  for (var i = 1; i <= c; i++) {
    maps.some((item, idx, array) => {

      if (item == 0) {
        tmp = 0
        start = idx
      }
      else {
        exist = item.indexOf(i)
        if (exist > -1 ) {
          tmp++
          if (tmp >= 2) {
            ans++
            return true
          }
        }
        if (idx - start >= m) {
          tmp = 0
          start = idx
        }

      }

      if (idx == maps.length - 1 && array[0] != 0) {
        exist = array[0].indexOf(i)
        if (exist > -1 ) {
          tmp++
          if (tmp >= 2) {
            ans++
            return true
          }
        }
      }

    })
    tmp = 0
    start = 0
  }
  console.log(ans)
}
continusMuch(2, 3, [[1,2,3], 0, [2,3], [2], [3]])