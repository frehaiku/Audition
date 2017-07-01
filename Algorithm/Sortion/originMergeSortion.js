/**
 * Created by 海枯 on 2017/6/30.
 */

// 递归使用归并排序，对arr[l ... r]的范围进行排序
function __mergeSort(arr, l, r) {
  if (l >= r) return;
  // 根据l和r的偏移量取mid
  var mid = Math.floor((r + l) / 2)
  __mergeSort(arr, l, mid)
  __mergeSort(arr, mid + 1, r)
  // 归并排序优化1:
  // 归并排序后的数组是有序的，只需执行无序的情况
  // 归并排序优化2：
  // 当执行到递归末尾的时候，可以考虑使用插入排序去优化
  if (arr[mid] > arr [mid + 1])
    __merge(arr, l, mid, r)
}

// 将arr[l ... mid] 与 arr[mid + 1 ... r]两部分合并
function __merge(arr, l, mid, r) {
  var twice = new Array(r - l + 1)

  for (var i = l; i <= r; i++)
    twice[i - l] = arr[i]

  var lPoint = l, rPoint = mid + 1

  // 在原数组上改变对应的值，使其一部分是有序的
  for (var k = l; k <= r; k++) {
    if (lPoint > mid) {
      arr[k] = twice[rPoint - l]
      rPoint++
    } else if (rPoint > r) {
      arr[k] = twice[lPoint - l]
      lPoint++
    } else if (twice[lPoint - l] < twice[rPoint - l]) {
      arr[k] = twice[lPoint - l]
      lPoint++
    } else {
      arr[k] = twice[rPoint - l]
      rPoint++
    }

  }
}

// 归并排序 main方法
function mergeSort(array, n) {
  __mergeSort(array, 0, n - 1)
}

function productRand(min, max, n) {
  var arr = new Array(n)
  for (var i = 0; i < n; i++) {
    arr[i] = ~~(Math.random() * (max - min)) + min
  }
  return arr
}

const n = 100

var example1 = productRand(0, 100, n)
console.log("BeforeSort:")
console.log(example1.toString())

mergeSort(example1, n)

console.log("AfterSort:")
console.log(example1.toString())

var example2 = productRand(0, 500, n)
console.log("BeforeSort:")
console.log(example2.toString())

mergeSort(example2, n)

console.log("AfterSort:")
console.log(example2.toString())