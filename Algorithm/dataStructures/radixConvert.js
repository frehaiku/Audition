/**
 * Created by 海枯 on 2017/6/19.
 *
 * 十进制转换为N进制采用了栈的思想
 */

function Stack(init) {
  this.dataStore = init || []
  // 栈顶元素位置
  this.top = (init && init.length) || 0
  // 栈顶元素
  this.peek = () => this.dataStore[this.top - 1]
  this.length = () => this.top
}
Stack.constructor = Stack

Stack.prototype = {
  push (ele) {
    this.dataStore[this.top++] = ele
  },
  pop () {
    return this.dataStore[--this.top]
  },
  clear () {
    this.dataStore = []
    this.top = 0
  }
}

// 十进制转N进制具体代码实现
function numToN(num, n) {
  // 8 % 2 = 0, 8 / 2 = 4
  // 4 % 2 = 0, 4 / 2 = 2
  // 2 % 2 = 0, 2 / 2 = 1
  // 1 % 2 = 1, 1 / 2 = END

  let stack = new Stack(), mod, converted

  do {
    mod = num % n
    stack.push(mod)
    num = num / n
  } while (num >= 1)

  converted = ''
  while (stack.length() > 0)
    converted += stack.pop()
  return converted
}
// 将十进制八进制为二进制
let result = numToN(8, 2)
console.log(result)

