/**
 * Created by 海枯 on 2017/8/12.
 */
/**
 * 动态规范
 * @param n 金矿的数量
 * @param w 工人数
 * @param g 金矿数组
 * @param p 用工量数组
 * @returns {Array}
 */
function getMostGold(n, w, g, p) {
  var preResult = new Array(p.length)
  var results = new Array(p.length)
  var max = 0
  // 填充边界格子的值
  for (var i = 0; i <= w; i++) {
    if (i < p[0]) {
      preResult[i] = 0
    } else {
      preResult[i] = g[0]
    }
  }

  // 填充其余格子的值，外层循环是金矿数量，内层循环是工人数
  for (i = 0; i < n; i++) {
    for (var j = 0; j <= w; j++) {
      if (j < p[i]) {
        results[j] = preResult[j]
      } else {
        results[j] = Math.max(preResult[j], preResult[j - p[i]] + g[i])
      }
      max = results[j] > max ? results[j] : max
    }
    preResult = results.slice()
  }
  console.log(`max price is ${max}`)
  return results
}
var n = 5
var w = 10
// 金矿数组
var g = [400, 500, 200, 300, 350]
// 用工量数组
var p = [5, 5, 3, 4, 3]

console.log(getMostGold(n, w, g, p))

function checkMask(mask) {
  var obj = mask;
  var exp = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
  var reg = obj.match(exp);
  if (reg == null) {
    return false; //"非法"
  }
  else {
    return true; //"合法"
  }
}
console.log(checkMask('255.255.1.0'))

function func(n) {
  var cnt = 0;
  for (var i = 1; i< n; i++)
    for (var j = 1; j <= n; j+= i)
      cnt++
  console.log(cnt)
}
func(8)

function continte(str) {
  var ans = 0;
  var tmp = str[0]
  var compute = 0
  for (var i = 1; i < str.length; i++) {
    if (str[i] != tmp) {
      if (compute == 0) {
        compute = 2;
      } else {
        compute++;
      }
      if (compute > ans)
        ans = compute;
      tmp = str[i];
    } else {
      compute = 0;
    }
  }
  console.log(ans);
}
continte('1')

function xulie(str, once) {
  // let once = +readline()
  let arr = str.split(' ')
  let ans = ''
  for (let i = 0; i < once; i++) {
    if (ans.length > 1) {
      ans = `${arr[i]} ${ans.split(' ').reverse().join(' ')}`
    } else if(ans.length == 1)
      ans = `${arr[i]} ${ans}`
    else
      ans = arr[i]
  }
  console.log(ans)
}
xulie('1 2 3 4', 4)

function hasFull(str) {
  var arr = str.split(' ')
  var house = +arr[0]
  var hasF = +arr[1]
  var total = +arr[2]
  var fruitMon = +arr[3]

  var ans = 0

  while (total >= 0) {
    if (hasF-- <= 0) {
      total -= fruitMon
    }
    total -= house
    ans++
  }
  console.log(ans - 1)
}
hasFull('3 5 100 10')

function youhua(str) {
  var arr = str.split(' ')
  var house = +arr[0]
  var hasF = +arr[1]
  var total = +arr[2]
  var fruitMon = +arr[3]

  var tmp1 = total / house;
  if(tmp1 <= hasF) return tmp1;
  total -= hasF * house;
  return hasF + total / (house + fruitMon);
}
console.log(youhua('3 5 100 10'))