/**
 * 双路快排：
 * 利用两个变量做标记，这两个变量分别位于最前和最后的索引位置
 * 最前的索引寻找比他大的数，最后的索引寻找比大小的数，交换位置，
 * 不断重复以上过程
 * Created by 海枯 on 2017/7/2.
 */
var {productRand, swap} = require('./sortHelper')

function __partition(array, l, r) {
  // 取数组随机元素作为基准数，并与第一个元素交换位置
  var privotIdx = l + ~~((r - l + 1) * Math.random())
  swap(array, l, privotIdx)

  var i = l + 1, j = r
  while (true) {
    while (i <= r && array[i] < array[l]) i++
    while (j >= l + 1 && array[j] > array[l]) j--
    if (i >= j) break
    swap(array, i, j)
    // 上一个i++不符合要求，所以要再下一个元素
    i++
    j--
  }
  swap(array, l, j)
  return j
}
function __quickSort(array, l, r) {
  if (l >= r) return
  var i = __partition(array, l, r)
  // 对基准左边的元素排序
  __quickSort(array, l, i - 1)
  // 对基准右边的元素排序
  __quickSort(array, i + 1, r)
}

function quickSortionTW(array, n) {
  __quickSort(array, 0, n - 1)
}

var n = 100
var example1 = productRand(0, 100, n)
console.log('beforeSortion: ' + example1.toString())

quickSortionTW(example1, n)

console.log('afterSortion: ' + example1.toString())