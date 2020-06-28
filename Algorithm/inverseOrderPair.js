/**
 * 逆序对：
 * 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组,求出这个数组中的逆序对的总数P。
 * 输入：1,2,3,4,5,6,7,0
 * 输出：7
 * Created by 海枯 on 2017/8/19.
 */

var cnt;

function InversePairs(array) {
  cnt = 0;
  if (array != null)
    mergeSortUp2Down(array, 0, array.length - 1);
  return cnt;
}

/**
 * 归并排序(从上往下)
 * @param a
 * @param start
 * @param end
 */
function mergeSortUp2Down(a, start, end) {
  if (start >= end)
    return;
  var mid = (start + end) >> 1;

  mergeSortUp2Down(a, start, mid);
  mergeSortUp2Down(a, mid + 1, end);

  merge(a, start, mid, end);
}

/**
 * 将一个数组中的两个相邻有序区间合并成一个
 * @param a
 * @param start
 * @param mid
 * @param end
 */
function merge(a, start, mid, end) {
  // 记录tmp数组便于更新arr原数组的值
  var tmp = new Array(end - start + 1)

  var i = start, j = mid + 1, k = 0;
  // 只要有一边超过了边界就跳出
  while (i <= mid && j <= end) {
    if (a[i] <= a[j])
    // 按照数字的顺序将数存进tmp数组中
      tmp[k++] = a[i++];
    else {
      tmp[k++] = a[j++];
      // 当前左数组序号与最后一个序号相差多少，即得出有多少数比他大
      // 如左：1 2 3 4，右：0 5 6 7。
      // 第一比较回合：左1与右0，当比较到左1>左0时，表示左的后面都比0大，
      // 因为左右都是递增数组，既然左边第1个元素都比右边1大，那么左边的所有元素也肯定比右1大。
      cnt += mid - i + 1;  // core code, calculate InversePairs............
    }
  }
  // 填充左右比较数组没有加进来的元素
  while (i <= mid)
    tmp[k++] = a[i++];
  while (j <= end)
    tmp[k++] = a[j++];
  // 更新原数组
  for (k = 0; k < tmp.length; k++)
    a[start + k] = tmp[k];
}

console.log(InversePairs('1,2,3,4,5,6,7,0'.split(',')))

function FindGreatSum(array) {
  var size = array.length;
  var max = array[0];
  var tmp = max;
  for (var i = 1; i < size; i++) {
    var item = array[i];
    if (tmp >= 0)
      tmp += item
    else
      tmp = item
    if (tmp > max)
      max = tmp
  }
  return max;
}
console.log(FindGreatSum([2, 8, 1, 5, 9]))