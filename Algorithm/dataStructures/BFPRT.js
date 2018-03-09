/**
 * Created by 海枯 on 2018/3/9.
 */
/**
 * 查找第n大的值（查找第n小的值）
 * @constructor
 */

var {swap} = require('../Sortion/sortHelper')
function Bfprt(arr, left, right, k) {
  var midInmidIdx = getProvitIdx(arr, left, right, k)
  var partIdx = partition(arr, left, right, midInmidIdx)

  // (+1表示最大为第1大，没有第0大)
  var num = partIdx - left + 1
  if (num == k)
    return partIdx
  else if (num > k)
    return Bfprt(arr, left, partIdx - 1, k)
  else
    return Bfprt(arr, partIdx + 1, right, k - num)
}

function getProvitIdx(arr, left, right) {
  if (right - left < 5)
    return insertSortReturnMid(arr, left, right)
  else {
    var midSwap = left
    for (var i = left; i + 4 <= right; i += 5) {
      var partMid = insertSortReturnMid(arr, i, i + 4)
      swap(arr, midSwap++, partMid)
    }
    return Bfprt(arr, left, midSwap - 1, (midSwap - 1 - left >> 1) + 1)
  }
}

function insertSortReturnMid(arr, left, right) {
  for (var i = left + 1; i <= right; i++) {
    var j = i - 1
    var ele = arr[i]
    while (j >= left && ele < arr[j])
      arr[j + 1] = arr[j--]
    arr[j + 1] = ele
  }
  return (left + right) >> 1
}

function partition(arr, left, right, provitIdx) {
  swap(arr, left, provitIdx)

  var provit = arr[left]
  var j = left

  for (var i = left + 1; i <= right; i++) {
    if (provit > arr[i])
      swap(arr, ++j, i)
  }
  swap(arr, left, j)
  return j
}

function main() {
  var arr1 = [6,5,4,3,1,14,153,1432,1312, -1, -3]
  var arr1Idx = Bfprt(arr1, 0, arr1.length-1, 2)
  console.log("第2小的数字的索引", arr1Idx)
  console.log("第2小的数字", arr1[arr1Idx])
}

main()