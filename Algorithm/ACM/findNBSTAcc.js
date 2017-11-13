/**
 * 求包含n个节点的二叉查找树的种类数
 * Created by 海枯 on 2017/11/13.
 */

function main(n) {
  if (n == 0)
    return 0
  else if (n == 1)
    return 1
  else if (n == 2)
    return 2
  var dp = new Array(n)
  dp[0] = 1
  dp[1] = 1
  dp[2] = 2
  for (var i = 3; i <= n; i++) {
    var c = 0
    for (var j = 1; j <= i; j++)
      c += dp[j - 1] * dp[i - j]
    dp[i] = c
  }
  return dp[n]
}
console.log(main(5))