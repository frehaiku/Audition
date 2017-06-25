/**
 * Created by 海枯 on 2017/6/25.
 * 基数排序原理：
 * 利用了队列的思想：
 * 首先按照个位进行排序，将排序结果放在0-9的盒子中
 * 依次从0-9盒子中取出来，对十位及以上的数字进行排序
 * 最终得到的数字就是排好序的结果
 */

// 构建queue队列类
function Queue() {
  this.dataStore = []
  this.length = 0
}

Queue.constructor = Queue
Queue.prototype = {
  enqueue (element) {
    this.dataStore.push(element)
    this.length++
  },
  dequeue () {
    this.length--
    return this.dataStore.shift()
  }
}

/**
 * 基数排序--根据位数的大小加入队列中
 * @param nums 要排序的数字
 * @param queues 队列数组
 * @param type 位数，0表示个位，1表示十位...
 */
function enqueue(nums, queues, type) {
  for (var i = 0; i < nums.length; i++) {
    // 当前位的数字
    var radixNum = nums[i] / Math.pow(10, type) % 10
    queues[Math.floor(radixNum)].enqueue(nums[i])
  }
  dequeue(nums, queues)
}

/**
 * 基数排序--将队列中的结果更新到原数组中
 * @param nums
 * @param queues
 */
function dequeue(nums, queues) {
  var i = 0, j = 0
  while (j < queues.length) {
    while (queues[j].length > 0) {
      nums[i++] = queues[j].dequeue()
    }
    j++
  }
}

/**
 * 求数组中最大元素的长度
 * @param nums
 * @returns {number}
 */
function maxLen(nums) {
  var max = 0
  for (var i = 0; i < nums.length; i++)
    if (max < nums[i].toString().length)
      max = nums[i].toString().length

  return max
}

function radixSortion(nums) {
  var queues = [],
    maxLength = maxLen(nums)
  // 创建10个桶
  for (var i = 0; i < 10; i++)
    queues[i] = new Queue()
  // 从最低位排到最高位
  for (var k = 0; k < maxLength; k++)
    enqueue(nums, queues, k)

  return nums
}

(function () {
  var nums = []
  for (var rand = 0; rand < 15; rand++) {
    nums[rand] = Math.ceil(Math.random() * 1000)
  }
  console.log(radixSortion(nums))
})()
