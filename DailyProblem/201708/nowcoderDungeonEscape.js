/**
 * Created by 海枯 on 2017/9/7.
 */
var hell = [
  ['.', '.', '.'],
  ['.', '.', '.'],
  ['.', '.', '.']
]

var startX = 0, startY = 1

var allow = [
  {x: 1, y: 0},
  {x: 0, y: 1},
  {x: -1, y: 0},
  {x: 0, y: -1}
]

function maxji(arr, k, d) {
  arr = arr.map(e => +e)
  // console.log(arr)
  return process(arr, k, k-1, k, d, 0, 1)
}

/**
 *
 * @param arr
 * @param prev
 * @param curr
 * @param k 选k个学生
 * @param d 要求相邻两个学生的位置编号的差不超过d
 * @param count 当前已经选的学生数
 * @param result 累乘的结果
 */
function process(arr, prev, curr, k, d, count, result) {
  if (prev - curr > d || (curr <= 0 && count != d))
    return 0
  if (k == count)
    return result
  return Math.max(
    // 选当前元素
    process(arr, curr, curr - 1, k, d, count + 1, arr[curr] * result),
    process(arr, prev, curr - 1, k, d, count, result)
  )
}
// var str = '-1 -15 2 3 4'
var str = '1 15 2 3 4'
// var str = '4 3 2 -15 -1'
console.log(maxji(str.split(' '), 3, 31))