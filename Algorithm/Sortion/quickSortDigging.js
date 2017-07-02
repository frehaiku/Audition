var {productRand, swap} = require('./sortHelper'),
  n = 100

// 快速排序--挖坑填数+分治法

// 过程如下：
// 取第一个元素作为基准元素 72
// 规定小于或等于基准元素的数字放左边，大于基准元素的数字放右边
// 从右向左的变量为 j = len - 1 ，从左往右的变量为 i = 0

// 第一趟 j = 9, j-- 找比72小的元素，找到了48。将72替换成48。此时 j = 8;
// 数组为[48, 6, 57, 88, 60, 42, 83, 73, 48, 85]

// 第二趟 i = 0, i++ 找比72大的元素，找到了88。将48替换成88。此时 i = 4;
// 数组为[48, 6, 57, 88, 60, 42, 83, 73, 88, 85]

// 第三趟 j = 8, j-- 找比72小的元素，找到了42。将88替换成42。此时 j = 5;
// 数组为[48, 6, 57, 42, 60, 42, 83, 73, 88, 85]

// 第四趟 i = 4, j++ 找比72大的元素，i 和 j相遇，此次循环结束。将 j = i = 5的位置写入72
// 数组为[48, 6, 57, 42, 60, 72, 83, 73, 88, 85]

// 该次排序结束 小于72的都放在左边 大于72的都放在右边
// 按照此步骤继续递归
var arr = [7, 6, 5, 4, 3, 2], len = arr.length;

function quickSortDiggingOrigin(arr) {
  var len = arr.length;
  if (len <= 1) {
    return [];
  }

  var i = 0, j = len - 1;
  var basic = arr[0];

  var nonce = basic;

  while (i !== j) {
    for (; j !== i; j--) {
      nonce = arr[j];
      if (basic > arr[j]) {
        arr[i] = nonce;
        break;
      }
    }

    for (; i !== j; i++) {
      nonce = arr[i];
      if (basic < arr[i]) {
        arr[j] = nonce;
        break;
      }
    }
  }

  arr[i] = basic;
  // console.log(arr);

  var left = arr.slice(0, i + 1);
  var right = arr.slice(i + 1);

  return quickSortDiggingOrigin(left).concat(arr[i], quickSortDiggingOrigin(right));
}

console.log("quickSortDiggingOrigin: " + quickSortDiggingOrigin(arr));

/*
 * in-place第二种内部交换法
 *
 * 思路：
 * 将pivot设置为最后一个元素，
 * 3 7 8 5 2 1 9 5 4
 * pivot = 4，storeInd = 0， i = 0
 * 用i做该数组的遍历：
 * 比较该数是否比pivot大
 * 是 ---> storeInd 与 i 位置的元素交换，且storeInd++
 * 第一轮：i = 0，storeInd = 0, 3 与其本身做交换
 * 第二轮：i = 4, storeInd = 1, 7与2交换
 * 3 2 8 5 7 1 9 5 4
 * 第三轮：i = 5, storeInd = 2, 8与1交换
 * 3 2 1 5 7 8 9 5 4
 *
 * storeInd = 3，此后没有小于pivot的数，结束此次循环
 * 此时，storeInd的数与pivot的数进行交换
 * 3 2 1 4 7 8 9 5 5
 *
 * 下轮递归执行：
 * [3, 2, 1]与[7, 8, 9, 5, 5]
 * */
function quickSortionInPlace(array, n) {
  __quickSortionInPlace(array, 0, n - 1)
}
function __quickSortionInPlace(array, l, r) {
  if (l >= r) return;

  var mid = __partition(array, l, r)
  __quickSortionInPlace(array, l, mid)
  __quickSortionInPlace(array, mid + 1, r)
}
// 返回j，使得arr[l, ... j-1) < arr[j] ; arr[j+1 ... r] > arr[j]
function __partition(array, l, r) {
  var provit = array[l]
  var j = l
  for (var i = l + 1; i <= r; i++)
    if (array[i] < provit)
      swap(array, ++j, i)
  swap(array, l, j)
  return j
}
var example1 = productRand(1, 100, n)
console.log('Before sorting:' + example1.toString())
quickSortionInPlace(example1, n)
console.log('after sorting: ' + example1.toString())

// 算法的一点点小优化
var quickSortDiggingReform = function (arr) {
  var i = 0, len = arr.length, j = len - 1, norm = arr[i];
  if (len <= 1) return [];

  while (i < j) {

    while (i < j && arr[j] >= norm) j--;
    if (i < j)
      arr[i++] = arr[j];

    while (i < j && arr[i] < norm) i++;
    if (i < j)
      arr[j--] = arr[i];

  }
  arr[i] = norm;
  var left = arr.slice(0, i + 1);
  var right = arr.slice(i + 1);
  return quickSortDiggingReform(left).concat(arr[i], quickSortDiggingReform(right));
}

console.log("quickSortDiggingReform: " + quickSortDiggingReform(arr));
