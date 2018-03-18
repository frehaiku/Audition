/**
 * Created by 海枯 on 2018/3/18.
 */

/**
 * 不用存储空间，反转一个栈
 * 思路：
 * 假设栈[1,2,3,4]
 * 整体思想是把栈底元素取出来，保存在递归变量里面，然后一步步把tmp变量push进来
 * 流程：
 * i = 0，tmp = 1 stack = [2, 3, 4]
 * i = 1，tmp = 2 stack = [3, 4]
 * i = 2，tmp = 3 stack = [4]
 * i = 3，tmp = 4 stack = []
 * @param stack
 */
function noUseStorgeReverseStack(stack) {
  if (stack.length == 0)
    return;
  var last = getLastElement(stack)
  noUseStorgeReverseStack(stack)
  stack.push(last)
}

function getLastElement(stack) {
  var pop = stack.pop()
  if (stack.length == 0)
    return pop;
  else {
    var last = getLastElement(stack)
    stack.push(pop)
    return last
  }
}

var stack = [1, 2, 5, 8, 10]
noUseStorgeReverseStack(stack)
console.log(stack)