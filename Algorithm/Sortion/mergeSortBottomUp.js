/**
 * 自底向上的归并排序
 * Created by 海枯 on 2017/7/1.
 */

function mergeSortBU(array, n) {
  // 第一轮sz = 1，第二轮sz = 2，第三轮sz = 4， 第四轮sz = 8
  for (var sz = 1; sz <= n; sz += sz) {
    for (var k = 0; k + sz < n; k += sz + sz) {
      __merge(array, k, k + sz - 1, Math.min(k + sz + sz - 1, n - 1))
    }
  }
}

// 合并[l, ... , mid] 与 [mid + 1, ... , r]
function __merge(array, l, mid, r) {
  // 新建个能装下两个数组长度的数组
  var twice = new Array(r - l + 1)
  // 复制原数组要排序的值，做映射
  for (var i = l; i <= r; i++)
    twice[i - l] = array[i]

  var lInit = l, rInit = mid + 1

  for (var k = l; k <= r; k++) {
    if (lInit > mid ) {
      array[k] = twice[rInit - l]
      rInit++
    }else if (rInit > r || twice[lInit - l] < twice[rInit - l]) {
      array[k] = twice[lInit - l]
      lInit++
    } else {
      array[k] = twice[rInit - l]
      rInit++
    }
  }
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

mergeSortBU(example1, n)

console.log("AfterSort:")
console.log(example1.toString())