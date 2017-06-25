/**
 * Created by 海枯 on 2017/6/25.
 * 利用栈判断是否为回文的原理：
 * 首先将字符串从左到右入栈。
 * 出栈时将出栈元素跟字符串第N个元素比较，任意一个不相同则不是回文
 */

function Stack() {
  this.dataStore = []
  this.top = 0
  this.length = () => this.top
}

Stack.constructor = Stack
Stack.prototype = {
  push (ele) {
    this.dataStore[this.top++] = ele
  },
  // 模拟过程，其实没有改变dataStore
  pop () {
    return this.dataStore[--this.top]
  }
}

function isPalindrome(string) {
  let i,
    stack = new Stack(),
    totalLen = string.length
  for (i = 0; i < totalLen; i++)
    stack.push(string[i])

  while (stack.length() > Math.floor(totalLen / 2)) {
    if (string[totalLen - stack.length()] != stack.pop())
      return false
  }
  return true
}

console.log(isPalindrome('abba')) // true
console.log(isPalindrome('hello'))  // false
console.log(isPalindrome('racecar'))  // true
