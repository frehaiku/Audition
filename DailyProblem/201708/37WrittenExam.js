/**
 * Created by 海枯 on 2017/9/13.
 */
function Hero(name) {
  var obj = {}
  obj.kill = function (much) {
    var text = much > 1 ? 'bugs' : 'bug'
    console.log(`Kill ${much} ${text}`)
    return obj
  }
  obj.recovers = function (much) {
    console.log(`Recover ${much} bloods`)
    return obj
  }
  obj.sleep = function () {
    new Promise(function (resolve) {
      setTimeout(function () {
        resolve(obj)
      }, seconds * 1000)
    })
      .then(function () {
        return obj
      })
  }
  /*obj.prototype = {
   kill () {

   },
   recovers (much) {
   console.log(`Recover ${much} bloods`)
   return obj
   },
   sleep (seconds) {
   new Promise(function (resolve) {
   setTimeout(function () {
   resolve(obj)
   }, seconds * 1000)
   })
   .then(function () {
   return obj
   })
   }
   }*/
  obj.constructor = Hero
  console.log(`Hi This is ${name}`)
  return obj
}

/*
 Hero('37FEer');
 Hero('37FEer').kill(1).recovers(30)
 Hero('37FEer').sleep(2).kill(2)*/

function valid(arr) {
  var reg = /^[a-zA-Z]\w{7,}/
  var letter = /[a-z]+[A-Z]+|[A-Z]+[a-z]+/
  var numLower = /[0-9]+[a-z]+|[a-z]+[0-9]+/
  var numUpp = /[0-9]+[A-Z]+|[A-Z]+[0-9]+/
  var all = /[0-9]+[A-Z]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+/

  arr.forEach(str => {
    if (reg.test(str)) {
      if (letter.test(str) || numLower.test(str) || numUpp.test(str))
        console.log('YES')
      else
        console.log('NO')
    } else {
      console.log('NO')
    }
  })
}
// valid(['2Aaabbccdd', 'ABCde0', 'ABCedf012345', '0988763333333'])

function coumoney(price) {
  var s = [1, 2, 5, 10, 20, 50, 100]
  var kind = 0
  var acc = 0
  s.some((item, sidx) => {
    if (s[sidx + 1] >= price) {
      kind = sidx + 1
      for (var j = sidx; j >= 0; j--) {
        if (j !== 0)
          acc++
        else
          acc += price
        price = price - s[j]
      }
      return true
    }
  })
  console.log(kind + ' ' + acc)
}
/*
 coumoney(3)
 coumoney(10)
 coumoney(15)*/
/*var val = 'hello'
 console.log('This is' + (val === 'hello') ? 'Mine' : 'Yours')

 var str = 'world!';
 (function () {
 console.log(str)
 if (typeof str == 'undefined') {
 var str = 'Jack'
 console.log('Goodbye ' + str)
 } else {
 console.log('Hello' + str)
 }
 })()*/
/*var arr = [1, 2, 3, 4, 5, 6]

 function fn(m, k, i) {
 if (i == 1)
 return (m + k - 1) % m
 else
 return (fn(m - 1, k, i - 1) + k) % m
 }
 function queuePop(arr) {
 var m = arr.length
 var k = 3
 for (var i = 1; i <= m; i++) {
 console.log(fn(m, k, i) + 1)
 }
 }
 queuePop(arr)*/


function sheetSort(arr, l, r) {
  function swap(array, i, j) {
    var tmp = array[i]
    array[i] = array[j]
    array[j] = tmp
  }

  var len = r - l + 1
  var gap = ~~(len / 2)
  while (gap > 0) {
    var i, j
    for (i = 0; i + gap <= r; i++) {
      // 插入排序，从后往前
      j = ~~(len / gap) * gap
      while (j >= i) {
        if (arr[j] < arr[j - gap]) {
          swap(arr, j, j - gap)
        }
        j -= gap
      }
    }
    gap = ~~(gap / 2)
  }
  console.log(arr)
}
// sheetSort([6, 5, 4, 3, 2, 1], 0, 5)
// sheetSort([30, 25, 28, 40, 15, 10, 38, 35, 20, 26], 0, 9)

function wipeTrimAndReverseStr(str) {
  return str.replace(/\w+\s+/g, function (m) {
    return m.trim().split('').reverse().join('') + ' '
  });
}
// console.log(wipeTrimAndReverseStr('abc def ghi l'))

function checkSymbolIsValid(parens) {
  var valid = {
    '{': '}',
    '[': ']',
    '(': ')'
  }
  var stack = []
  var i, length = parens.length
  var e
  for (i = 0; i < length; i++) {
    e = parens[i]
    if (e in valid) {
      stack.push(e)
    } else if (stack.length != 0 && e == valid[stack[stack.length - 1]]) {
      stack.pop()
    }
  }
  if (stack.length == 0)
    console.log('OK')
  else
    console.log(stack.join(''))
}
// checkSymbolIsValid('(]')
checkSymbolIsValid('[{()])}')
// checkSymbolIsValid("prvar (Hello Netease')")


function inSameSolid(x, y, n) {
  if (n == 1)
    console.log("1")

  var a, b, c
  var tmp
  var ans = 1
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < i; j++) {

      a = y[j] - y[i]
      b = x[j] - x[i]
      c = -a * x[i] + b * y[i]
      tmp = 0
      for (var t = 0; t < n; t++) {
        if (a * x[t] - b * y[t] + c == 0) {
          tmp++
        }
      }
      ans = Math.max(ans, tmp)
    }
  }
  console.log(ans)
}
// inSameSolid([1, 3, 0, 1], [2, 6, 0, 3], 4)

function largestNum(array) {
  array.sort((a, b) => {
    return (b + a) - (a + b)
  })
  console.log(array.join(''))
  /*var tmp
   for (var i = 0; i < array.length; i++) {
   for (var j = i + 1; j < array.length; j++) {
   if ((array[i] + array[j]) < (array[j] + array[i])) {
   tmp = array[i]
   array[i] = array[j]
   array[j] = tmp
   }
   }
   }

   if (array[0] == "0")
   console.log("0")
   else {
   console.log(array.join(''))
   }*/
}

// largestNum(['3', '30', '34', '5', '9'])
// largestNum(['1', '10', '14', '5', '9'])

function simpleUnixPath(path) {
  var s = []
  var len = path.length;
  var i = 0;
  var tmp = '';
  while (i < len) {
    while (i < len && path[i] == '/')
      i++;
    tmp = '';
    while (i < len && path[i] != '/') {
      tmp += path[i];
      i++;
    }

    if (tmp == "..") {
      if (!(s.length == 0))
        s.pop();
    }
    else if (tmp == ".")
      continue;
    else if (!(tmp.length == 0)) {
      s.push(tmp);
    }
  }

  if (s.length == 0)
    return "/";
  var result = "";
  while (!(s.length == 0)) {
    result = "/" + s[s.length - 1] + result;
    s.pop();
  }
  return result;
}

// console.log(simpleUnixPath('/a/./b/../../c/'))

function buildPalindrome(arr) {
  var len = arr.length
  var strify = arr.join(' ')
  var reverse = arr.reverse()
  var reverseify = reverse.join(' ')
  var sum = 0
  sum = arr.reduce((a, b) => +a + +b, 0)
  if (strify != reverseify) {
    var mid = ~~(len / 2)
    var i
    var tmp
    if (len % 2 == 1) {
      for (i = mid - 1; i >= 0; i--) {
        if (arr[i] == arr[mid + i])
          continue
        if (arr[i] > arr[mid + i]) {
          tmp = arr[mid + i]
          arr.splice(mid + i - 1, 0, tmp)
        } else {
          tmp = arr[i]
          arr.splice(i, 0, tmp)
        }
        sum += tmp
      }
    } else {
      var lstart = mid - 1
      var rstart = mid
      for (i = 0; i <= mid; i++) {
        if (arr[lstart - i] != arr[rstart + i]) {
          sum += arr[lstart - i] + arr[rstart + i]
        }
      }
    }
  }
  console.log(sum)
}
// buildPalindrome([1, 2, 3, 1, 2])
// buildPalindrome([1, 1, 3, 2, 2])
// buildPalindrome([51,23,52,97,97,76,23,51])
/*
 var arr = [0, 1]
 arr.splice(1, 0, 2)
 console.log(arr)*/

function fun(x) {
  if (x == 1)
    return 1
  var arr = new Array(1000)
  arr[0] = 1
  var ans = 2
  var end = 1
  var prevArr = [1]
  while (end) {
    for (var i = 0; i < ans; i++) {
      var prev = i - 1
      var cur
      if (prev >= 0 && i < ans - 1) {
        cur = prevArr[i - 1] + prevArr[i]
        if (cur == x)
          return ans
        arr[i] = cur
      } else {
        arr[i] = 1
      }
    }
    prevArr = arr.slice()
    ans++
  }
}
// console.log(fun(4))

function fun1(table, n) {
  var max = 0
  var i
  for (i = 0; i < table.length; i++) {
    if (table[i] == 1 &&
      i + 1 < table.length && table[i + 1] != 1 &&
      i + 2 < table.length && table[i + 2] != 1 &&
      i + 3 < table.length && table[i + 3] != 1)
      max++
  }
  if (max >= n)
    console.log(true)
  else
    console.log(false)
}

function func(str, n){
  var sum = 0;
  var arr = str.split("1");
  arr.forEach(function(el, index){
    if(index === 0 || index === arr.length - 1){
      sum += Math.floor(el.length / 2);
    }else if(el.length > 1){
      sum += Math.floor((el.length - 1) / 2);
    }
  })
  console.log(sum >= n)
}
/*fun1('1100000101', 2)
func('1100000101', 2)
fun1('10001', 1)
func('10001', 1)
fun1('10001', 2)
func('10001', 2)*/
// fun1('00000', 2)

function fun2(str) {

  // char str[30];
  // gets(str);
  var len = str.length;
  var i = 0, j = len - 1;
  var countdif = 0;

  while (i < j) {
    if (str[i] == str[j])      //首尾相向比较
    {
      i++;
      j--;
    }
    else {
      if (str[i + 1] == str[j] || str[i] == str[j - 1])  //判断是否为缺失位
      {
        str[i + 1] == str[j] ? i++ : j--;
        countdif++;
      }
      else {
        countdif = 2;
        break;
      }

    }
  }

  switch (countdif) {
    case 0:
      return false;
      break;
    case 1:
      return true;
      break;
    default:
      return false;
      break;
  }
}
// console.log(fun2('ab'))
// console.log(fun2('abb'))
// console.log(fun2('abc'))

function maxstr(str, add) {
  var ans = ''
  add = add.split('').sort().reverse().join('')
  var i, j
  for (i = 0; i < str.length; i++)
    for (j = 0; j < add.length; j++) {
      if (str.charCodeAt(i) >= add.charCodeAt(j)) {
        ans += str[i]
        break
      }
      else {
        ans += add[j]
        add = add.slice(0, j) + add.slice(j+1)
        // break
      }
    }
  console.log(ans)
}

maxstr('fedcba', 'abc')

var apple = {
  iphone: function () {return this.phoneVersion},
  phoneVersion: 7
}
console.log(typeof (app = apple.iphone)())

console.log('021'-'010')

function isodd(num) {
  return num % 2 == 1
}
function iseven(num) {
  return num % 2 == 0
}
function cb(num) {
  return iseven(num) || isodd(num)
}
console.log([5,6,-9,Infinity].map(cb))