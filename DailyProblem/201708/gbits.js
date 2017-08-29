/**
 * Created by 海枯 on 2017/8/29.
 *
 * G社正在开发一共新的战棋类游戏，在这个游戏中，
 * 角色只能向2个方向移动：右、下。移动需要消耗行动力，
 * 游戏地图上划分M*N个格子，当角色移动到某个格子上时，
 * 行动力就会加上格子上的值K（-100~100），当行动力<=0时游戏失败，
 * 请问要从地图左上角移动到地图右下角至少需要多少起始行动力，
 * 注意（玩家初始化到起始的左上角格子时也需要消耗行动力）
 */

/*2  3
 -2  -3  1
 -5  -10  1*/

var iMax = 2
var jMax = 3
var arr = [
  [-2, -3, 1],
  [-5, -10, 1]
]

function f1(...args) {
  var ans = 0;

  function f11(arr, i, j) {
    if (arr.length == 0) return 0
    if (i <= 0 && j <= 0)
      return arr[0][0]
    if (i == 0)
      return arr[0][j] + f11(arr, 0, j - 1)
    if (j == 0)
      return arr[i][0] + f11(arr, i - 1, 0)
    var m = Math.max(
      f11(arr, i, j - 1),
      f11(arr, i - 1, j)
    )
    if (m < 0 && m < ans)
      ans = m
    return arr[i][j] + m
  }

  f11.apply(null, args)
  return Math.abs(ans) + 1
}

// console.log(f1(arr, iMax - 1, jMax - 1))


function f2(arr, i, j) {
  if (arr.length == 0) return 0
  var ans = 0
  var dp = new Array(i)
  //first
  var inner = new Array(j)
  inner[0] = arr[0][0]
  for (var k = 1; k < j; k++)
    inner[k] = inner[k - 1] + arr[0][k]
  dp[0] = inner

  for (var g = 1; g < i; g++) {
    inner = new Array(j)
    inner[0] = arr[g][0] + dp[g - 1][0]
    for (var h = 1; h < j; h++) {
      var m = Math.max(dp[g - 1][h], inner[h - 1])
      inner[h] = m + arr[g][h]
      if (m < ans)
        ans = m
    }
    dp[g] = inner
  }
  return Math.abs(ans) + 1
  // console.log(ans)
  // return dp[i - 1][j - 1]
}

function f3(arr, i, j) {
  var ans = 0
  var dp = new Array(j)
  dp[0] = arr[0][0]
  // init
  for (let i = 1; i < j; i++)
    dp[i] = arr[0][i] + dp[i - 1]

  for (let a = 1; a < i; a++)
    for (let n = 0; n < j; n++)
      if (n == 0)
        dp[0] = arr[a][0] + dp[0]
      else {
        let m = Math.max(dp[n - 1], dp[n])
        if (m < 0 && m < ans) {
          ans = m
        }
        dp[n] = m + arr[a][n]
      }
  return Math.abs(ans) + 1
}
// console.log(f3(arr, iMax, jMax))
function test() {
  // 对数器
  for (var z = 0; z < 500; z++) {
    var row = ~~(Math.random() * 10) + 1
    var column = ~~(Math.random() * 10) + 1
    var arr = new Array(row)
    var inner
    for (var j = 0; j < row; j++) {
      inner = new Array(column)
      for (var i = 0; i < column; i++) {
        inner[i] = ~~(Math.random() * 100) - 50
      }
      arr[j] = inner
    }

    var res1 = f1(arr, row - 1, column - 1)
    var res2 = f2(arr, row, column)
    var res3 = f3(arr, row, column)

    if (res1 != res2 || res1 != res3 || res2 != res3) {
      console.log('fucking man')
      console.log(`${JSON.stringify(arr)}`)
      console.log(`The row is ${row}`)
      console.log(`The column is ${column}`)
    }
  }
  console.log('end...')
}
test()