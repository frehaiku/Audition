/**
 * Created by 海枯 on 2017/8/31.

 链接：https://www.nowcoder.com/questionTerminal/9370d298b8894f48b523931d40a9a4aa
 来源：牛客网
 风口之下，猪都能飞。当今中国股市牛市，真可谓“错过等七年”。
 给你一个回顾历史的机会，已知一支股票连续n天的价格走势，以长度为n的整数数组表示，
 数组中第i个元素（prices[i]）代表该股票第i天的股价。
 假设你一开始没有股票，但有至多两次买入1股而后卖出1股的机会，并且买入前一定要先保证手上没有股票。
 若两次交易机会都放弃，收益为0。
 设计算法，计算你能获得的最大收益。
 输入数值范围：2<=n<=100,0<=prices[i]<=100

 示例1：
 输入
 3,8,5,1,7,8
 输出
 12
 */

function m1(arr, cur, buy, sell, buyIdx) {
  if (buy == 0 && sell == 0 || cur <= 0)
    return 0
  // 已买入，必须卖出
  if (buy < sell) {
    return sold(arr, cur, buy, sell, buyIdx)
  } else {
    // 买入
    var a = m1(arr, cur - 1, buy, sell, buyIdx),
      b = m1(arr, cur - 1, buy - 1, sell, cur)
    console.log(`m1:${a}`)
    console.log(`m1:${b}`)
    return Math.max(
      a, b
    )
  }
}

// 卖
function sold(arr, cur, buy, sell, buyIdx) {
  if (buy == 0 && sell == 0 || cur <= 0)
    return 0
  var buyPrice = arr[buyIdx]
  var a = arr[cur] - buyPrice + m1(arr, cur - 1, buy, sell - 1, buyIdx)
  var b = sold(arr, cur - 1, buy, sell, buyIdx)
  console.log(`sold:${a}`)
  console.log(`sold:${b}`)
  var ans = Math.max(a, b)
  return ans
}
var arr = [3, 8, 5, 1, 7, 8]
var max = arr.length - 1
console.log(m1(arr, max, 2, 2, -1));