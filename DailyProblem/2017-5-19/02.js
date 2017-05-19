/**
 * Created by 海枯 on 2017/5/20.
 */
/*
*
* 时间限制：1秒
 空间限制：32768K
 给出一个区间[a, b]，计算区间内“神奇数”的个数。
 神奇数的定义：存在不同位置的两个数位，组成一个两位数（且不含前导0），且这个两位数为质数。
 比如：153，可以使用数字3和数字1组成13，13是质数，满足神奇数。同样153可以找到31和53也为质数，只要找到一个质数即满足神奇数。
 输入描述:
 输入为两个整数a和b，代表[a, b]区间 (1 ≤ a ≤ b ≤ 10000)。


 输出描述:
 输出为一个整数，表示区间内满足条件的整数个数

 输入例子:
 11 20

 输出例子:
 6
* */

(function (str) {
    function isShenqi(num) {
        var str = num.toString(), pin;
        for (var i = 0; i < str.length; i++) {
            for (var j = 0; j < str.length; j++) {
                if (i !== j) {
                    pin = +(str[i] + str[j]);
                    if (pin.toString().length >= 2 && isZhi(pin)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function isZhi(num) {
        for (var i = 2; i <= num - 1; i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }

    var arr = str.split(' '), count = 0;
    for (var i = +arr[0]; i <= +arr[1]; i++) {
        if (isShenqi(i)) {
            count++;
        }
    }
    console.log(count);
})("11 20");