/**
 * Created by 海枯 on 2017/8/31.
 */
let arr = [1,2,3,[1,2,3],[2,[3,4],3]]

function flatteningToArr1(arr) {
  let str = JSON.stringify(arr)
  let matchReg = /[\[\]]/g
  function replaceHandle(p, offset) {
    if (offset != 0 && offset != str.length - 1)
      return ''
    else
      return p
  }
  return JSON.parse(str.replace(matchReg, replaceHandle))
}

function flatteningToArr2(data) {
  let ans = []
  return function f1(arr) {
    arr.forEach(ele => {
      if (ele instanceof Array) {
        f1(ele)
      } else {
        ans.push(ele)
      }
    })
    return ans
  }(data)
}

console.log(flatteningToArr1(arr))
console.log(flatteningToArr2(arr))