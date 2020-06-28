/**
 * Created by 海枯 on 2017/9/10.
 */
function main(H, x, y, h, s) {
  h = h >= H ? H : h
  var beyondhTime = h / x
  if (s <= beyondhTime)
    return x * s
  else {
    var nextSeconds = Math.ceil(beyondhTime)
    var mayLeak = nextSeconds - beyondhTime
    var nextSecL = h + (mayLeak * x) - (mayLeak * y)
    if (s == nextSeconds) {
      return nextSecL
    }
    if (x > y) {
      var much = s - nextSeconds
      var ans = nextSecL + much * (x - y)
      return ans > H ? H : ans
    } else
      return h
  }
}

console.log(main(10, 2, 1, 3, 5))
console.log(main(10, 1, 2, 2, 5))
console.log(main(10, 1, 2, 9, 5))
console.log(main(10, 2, 1, 10, 5))
console.log(main(10, 2, 1, 9, 5))