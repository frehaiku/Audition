/**
 * 快排三路排序
 * 原理：先设立一个基准数，分别维护小于基准数，等于基准数，大于基准数，这三个区间
 * Created by 海枯 on 2017/7/2.
 */
var {productRand, swap} = require('./sortHelper')

function __partition(array, l, r) {
  var randIdx = l + ~~((r - l + 1) * Math.random())
  swap(array, l, randIdx)

  var e = array[l]
  var lt = l  // arr[l+1 ... lt] < v
  var gt = r + 1 // arr[gt ... r] > v
  var i = l + 1 // arr[lt + 1 ... i) == v

  while (i < gt) {
    if (array[i] < e) {
      swap(array, lt + 1, i)
      lt++
      i++
    } else if (array[i] > e) {
      swap(array, gt - 1, i)
      gt--
    } else {
      i++
    }
  }
  swap(array, l, lt)
  return lt
}

function __quickSortion(array, l, r) {
  if (l >= r) return

  var v = __partition(array, l, r)
  __quickSortion(array, l, v - 1)
  __quickSortion(array, v + 1, r)
}

function quickSortionTH(array, n) {
  __quickSortion(array, 0, n - 1)
}

var n = 100
var example1 = productRand(0, 100, n)
console.log('beforeSortion: ' + example1.toString())

quickSortionTH(example1, n)

console.log('afterSortion: ' + example1.toString())