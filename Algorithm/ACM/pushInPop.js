/**
 * Created by 海枯 on 2017/11/18.
 * 输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。
 * 假设压入栈的所有数字均不相等。例如序列1,2,3,4,5是某栈的压入顺序，序列4，5,3,2,1是该压栈序列对应的一个弹出序列，
 * 但4,3,5,1,2就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）
 */

/**
 *
 * @param pushV
 * @param popV
 * @returns {boolean}
 * @constructor
 */
function IsPopOrder(pushV, popV) {
  // write code here
  var i, len = popV.length
  var stack = []
  // init
  for (var j = 0; pushV[j] != popV[0] && j < len; j++)
    stack.push(pushV[j])
  // 找不到该元素
  if (j >= len && pushV[len - 1] != popV[0])
    return false
  for (i = 1; i < len; i++) {
    var item = popV[i]
    var prev = popV[i - 1]
    // 前面的值比当前值小
    if (item < prev)
      if (stack[stack.length - 1] != item)
        return false
      else
        stack.pop()
    // 前面的值比当前值大
    else {
      for (var k = j + 1; pushV[k] != item && k < len; k++)
        stack.push(pushV[k])
      // 找不到该元素
      if (k >= len && pushV[len - 1] != item)
        return false
    }
  }
  return true
}

console.log(IsPopOrder([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]))
console.log(IsPopOrder([1, 2, 3, 4, 5], [4, 3, 5, 1, 2]))