/**
 * Created by 海枯 on 2018/3/18.
 */

/**
 * 找出数组里面比前面都小，后面都大的数
 * 时间复杂度O(N)，空间复杂度O(N)
 * 思路：从左到右找到遍历到该元素时的最大元素存进一个数组中。
 * 另一个数组装着从右到左遍历时最小的元素。
 * 最后如果两个数组对应位置的数字一样，这个数就符合题意
 * @param arr
 */
function findLeftOfLtRightOfGt(arr) {
  var i, len = arr.length

  var leftToRightMax = new Array(len)
  var rightToLeftMin = new Array(len)

  for (i = 0; i < len; i++) {
    if (i == 0)
      leftToRightMax[i] = arr[i]
    else
      leftToRightMax[i] = Math.max(arr[i], leftToRightMax[i - 1])
  }

  for (i = len - 1; i >= 0; i--) {
    if (i == len - 1)
      rightToLeftMin[i] = arr[i]
    else
      rightToLeftMin[i] = Math.min(arr[i], rightToLeftMin[i + 1])
  }

  var j = 0
  var ans = []
  while (j < len) {
    if (leftToRightMax[j] == rightToLeftMin[j]) {
      ans.push(arr[j])
    }
    j++
  }
  return ans
}
console.log(findLeftOfLtRightOfGt([1, 3, 2, 4, 5, 9, 8]))
