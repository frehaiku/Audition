/**
 * Created by 海枯 on 2017/9/6.
 */
function number1(n, k) {
  return process(1, n, k);
}
// n个数，1~k
function process(pre, n, k) {
  if (n == 0) {
    return 1;
  }
  let sum = 0;
  for (let cur = pre; cur <= k; cur++) {
    sum += process(cur, n - 1, k);
  }
  for (let cur = 1; cur < pre; cur++) {
    sum += (pre % cur) != 0 ? process(cur, n - 1, k) : 0;
  }
  return sum % 1000000007;
}

console.log(number1(3, 4))