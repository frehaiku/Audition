/**
 * Created by 海枯 on 2017/5/20.
 */
/**
 * 牛牛想对一个数做若干次变换，直到这个数只剩下一位数字。
 变换的规则是：将这个数变成 所有位数上的数字的乘积。比如285经过一次变换后转化成2*8*5=80.
 问题是，要做多少次变换，使得这个数变成个位数。
 输入描述:
 输入一个整数。小于等于2,000,000,000。


 输出描述:
 输出一个整数，表示变换次数。

 输入例子:
 285

 输出例子:
 2
 **/

function addNum(num) {
    var input = num, count = 0, chen;
    while (input.length > 1) {
        chen = +input.split('')[0];
        input = input.split('').forEach(function (a, ind) {
            if (ind > 0)
                chen *= +a;
        });
        input = chen.toString();
        count++;
    }
    console.log(count);
}
addNum("999");