/**
 * Created by 海枯 on 2017/8/12.
 */
function f0(cweight, cidx, w, g, p, n) {
  if (cidx == n - 1)
    if (p[cidx] + cweight <= w)
      return g[cidx]
    else
      return 0
  else {
    if (p[cidx] + cweight <= w)
      return Math.max(
        g[cidx] + f0(p[cidx] + cweight, cidx + 1, w, g, p, n),
        f0(cweight, cidx + 1, w, g, p, n)
      )
    else
      return f0(cweight, cidx + 1, w, g, p, n)
  }
}

/**
 * 动态规划
 * @param n 金矿的数量
 * @param w 工人数
 * @param g 金矿数组
 * @param p 用工量数组
 * @returns {Array}
 */
function f1(n, w, g, p) {
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
  // console.log(`max price is ${max}`)
  // return results
  return max
}

function prodRand(min, max) {
  return min + ~~((max - min) * Math.random())
}

var n = 5
var w = 10
// 金矿数组
var g = [400, 500, 200, 300, 350]
// 用工量数组
var p = [5, 5, 3, 4, 3]
console.log(f1(n, w, g, p))
console.log(f0(0, 0, w, g, p, n))
console.log(f0(0, 0, 10, [6,3,5,4,6], [2,2,6,5,4], 5))