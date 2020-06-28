/**
 * Created by 海枯 on 2018/3/12.
 */
/*
       我们从低位到高位求每位1出现的次数，累加求和即可
         例如：求0~abcde中1的个数，现在我们求c这一位中1出现的次数，其他位雷同
         有两部分组成
         第一部分：ab * 100，表示当ab这两位在0~ab-1范围内时，de可以从0~99取值
           第二部分：如果c>1时，当ab为ab时1的个数为0~99
                   如果c=1时，当ab为ab时1的个数为de + 1
                 如果c<0时，当ab为ab是1的个数为0
     */
function NumberOf1Between1AndN_Solution(n) {
  if (n < 0) return 0;
  var high = n, low, temp, cur, num = 0, i = 1;
  while (high != 0) {

    var curPow = Math.pow(10, i)
    var curPowLess = Math.pow(10, i - 1)

    high = parseInt(n / curPow);
    temp = n % curPow;
    cur = parseInt(temp / curPowLess);
    low = temp % curPowLess;
    if (cur === 1) {
      num += high * curPowLess + low + 1;
    } else if (cur < 1) {
      num += high * curPowLess;
    } else {
      num += (high + 1) * curPowLess;
    }
    i++;
  }
  return num;
}

function NumberOf1Between1AndN_Solution2(n)
{
  // write code here
  if (n < 0)
    return 0
  var ans = 1
  for (var i = 2; i <= n; i++) {
    ans += numberOf1(i)
  }
  return ans
}

function numberOf1(n) {
  var num = 0
  while (n > 0) {
    if (n % 10 == 1)
      num++
    n = ~~(n / 10)
  }
  return num
}
console.log(NumberOf1Between1AndN_Solution(21))

console.log(NumberOf1Between1AndN_Solution2(21))