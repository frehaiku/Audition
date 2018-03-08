/**
 * Created by 海枯 on 2018/3/8.
 */
/**
 * 大数相加防止溢出
 * @param n1
 * @param n2
 */
function bigNumAdd(n1, n2) {

  // 考虑到应从个位数相加，故个位数应为第0个元素
  var numToArr1 = n1.toString().split('').reverse()
  var numToArr2 = n2.toString().split('').reverse()

  // 补0
  var far = numToArr1.length - numToArr2.length
  var shouldAddZero = far < 0
    ? numToArr1
    : numToArr2
  for (var k = 0; k < Math.abs(far);k++)
    shouldAddZero.push(0)

  var len = numToArr1.length
  // 存储结果的数组，考虑到最大一位有进位时最终结果会多一位数
  var result = new Array(len + 1).fill(0)

  var i
  for (i = 0; i < len; i++) {
    result[i] = result[i] + +numToArr1[i] + +numToArr2[i]
    result[i + 1] = Math.floor(result[i] / 10)
    result[i] = result[i] % 10
  }

  //去除最高位的0
  if (result[result.length-1] == 0)
    result.pop()
  // print
  console.log(result.reverse().join(''))
}

bigNumAdd(222, 333)
bigNumAdd(222, 999)
bigNumAdd(222, 9999)