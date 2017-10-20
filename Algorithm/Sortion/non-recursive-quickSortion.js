/**
 * Created by 海枯 on 2017/10/20.
 */
function quickSortion(arr) {
  var l = 0, r = arr.length - 1
  var stack = []
  stack.push({l, r})
  while (stack.length > 0) {
    var popEle = stack[stack.length - 1]
    l = popEle['l']
    r = popEle['r']
    stack.pop()

    var balance = partition(arr, l, r)
    l < balance - 1 && stack.push({l, r: balance - 1})
    r > balance + 1 && stack.push({l: balance + 1, r})
  }
  return arr
}

function partition(arr, l, r) {
  var provit = arr[l]
  var i = l, j
  for (j = l + 1; j <= r; j++)
    if (arr[j] < provit)
      swap(arr, j, ++i)
  swap(arr, l, i)
  return i
}
function swap(arr, l, j) {
  if (l == j) return
  arr[l] = arr[l] ^ arr[j]
  arr[j] = arr[l] ^ arr[j]
  arr[l] = arr[j] ^ arr[l]
}
console.log(quickSortion([6,5,4,3,2,1]))