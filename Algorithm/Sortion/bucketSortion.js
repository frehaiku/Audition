/**
 * Created by 海枯 on 2017/7/24.
 * 桶排序：典型的一种以空间换时间的排序算法
 * 步骤：
 * 1. 创建一个定量的空桶数组
 * 2. 遍历数组，将数组元素一个个加入桶中。对于有多个重复元素，设置数组值区分个数
 * 3. 对每个不是空的桶排序
 * 缺陷：
 * 1. 待排序的元素不能为负数，不能为小数
 * 2. 空间复杂度不确定，要看待排序元素中最大值是多少
 */

var {productRand} = require('./sortHelper'),
  n = 100

function bucketSortion(array, max) {
  // 创建空桶
  var buckets = new Array(max);
  // 将数组元素依次放入特定的桶中
  for (var i = 0; i < array.length; i++)
    if (!buckets[array[i]])
      buckets[array[i]] = 1;
    else
      buckets[array[i]]++;
  // 从桶中取元素放进原数组中
  for (var j = 0, k = 0; j < buckets.length; j++)
    while (buckets[j] != null && buckets[j]-- > 0)
      array[k++] = j;

  return array;
}

var example1 = productRand(1, 100, n);
console.log(bucketSortion(example1, example1.length));