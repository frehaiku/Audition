/**
 * in-place法：将数组的值交换到对应的下标下，如果对应的下标没有值，说明是缺失的元素
 * @param {number[]} nums
 * @return {number}
 */
const swap = (arr, i, j) => {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

const firstMissingPositive = (nums) => {
  if (nums.length < 1) return 1
  for (let i = 0;i < nums.length;i++) {
      while (nums[i] > 0 && nums[i] <= nums.length && nums[nums[i] - 1] !== nums[i]) {
          swap(nums, i, nums[i] - 1)
      }
  }

  for (let j = 0;j < nums.length;j++) {
      if (j + 1 !== nums[j]) {
          return j + 1
      }
  }
  return nums.length + 1
};

console.log(firstMissingPositive([1]))
console.log(firstMissingPositive([1,2,0]))
console.log(firstMissingPositive([3,4,-1,1]))
console.log(firstMissingPositive([7,8,9,11,12]))