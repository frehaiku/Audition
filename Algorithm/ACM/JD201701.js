/*
* 非正确答案 仅供参考
* */
(function (str) {
    // var first = read_line().split(' ')[1];
    var price = str.split(' ');

// int
    price.forEach(function (ele, ind) {
        price[ind] = +ele;
    });
    var compare = function (a, b) {
        return a - b;
    };
    price.sort(compare);

    var account = [];

    function computeGtCount(arr, value) {
        var count = 0;
        price.forEach(function (ele) {
            if (ele >= value) count++;
        });
        return count;
    }

    price.forEach(function (ele) {
        var count = computeGtCount(price, ele);
        account.push(ele * count);
    });

    var maxAccount = Math.max.apply(null, account);

    console.log(price[account.indexOf(maxAccount)]);
})("10 5 1 8");

function jiecheng(n) {
    var sum = n;
    while (n > 1) {
        sum = sum * (--n);
    }
    return sum;
}

console.log(jiecheng(4));

(function (str) {
    // var count = +read_line();

    var arr = str.split(' ');

    var accountRate = 0;
    // int
    arr.forEach(function (ele, ind) {
        arr[ind] = +ele * 0.01;
        accountRate += +ele * 0.01;
    });


    var minC = 0, totalRate = 0;

    arr.some(function (ele, ind) {
        totalRate += ele;
        minC += 1;
        if (totalRate / accountRate > 0.6) return true;
    });

    var allQ = arr.length;


    var c = jiecheng(allQ, minC) / jiecheng(minC, minC) + 1;


    var pw = arr[0];

    arr.forEach(function (ele, ind) {
        // if (!ind) pw *= ele;
        if (ind !== 0) pw *= ele;
    });

    console.log(pw);


    console.log((c * pw).toFixed(5));

    function jiecheng(n, once) {
        var sum = n;
        while (n > 1 && once > 1) {
            sum = sum * --n;
            once--;
        }
        return sum;
    }


})("50 50 50 50");

/**
 * 除夕夜A
 时间限制：C/C++语言 1000MS；其他语言 3000MS
 内存限制：C/C++语言 65536KB；其他语言 589824KB
 题目描述：
 在大年三十的晚上，小明不想看春晚，就在网上报名了一场网络程序设计比赛，比赛将于20:00开始，持续4个小时，之到午夜。比赛中会有n个问题，按照难度排序，也就是说，第一个问题是最简单的，最后一个问题是最难的。小明知道他解决第k个问题需要k * 5分钟。小明的父母允许小明不看春晚，但要求他必须参加跨年，就是小明必须在12.00或者12.00之前赶到客厅和父母一起跨年。他需要m分钟从房间走到客厅。请问，小明在去参加跨年之前最多能解决多少问题。
 输入
 每个样例输入两行，每行一个整数，n和m，(1 ≤ n ≤ 10, 1 ≤ m ≤ 240) 。
 输出
 输出小明最多能解决的问题数。

 样例输入
 4
 210
 样例输出
 3
 */
(function (str1, str2) {
    var qAccount = str1;
// sTime 表示	剩余时间
    var jianTime = str2, sTime = 240 - jianTime;
    var account = 0, i = 1;
    while (qAccount > 0 && sTime >= i * 5) {
        sTime = sTime - i * 5;
        account++;
        i++;
    }
    console.log(account);
})(4, 220);

/**
 * 求和A
 时间限制：C/C++语言 2000MS；其他语言 4000MS
 内存限制：C/C++语言 65536KB；其他语言 589824KB
 题目描述：
 小B正处于百无聊赖中，提不起干活的兴趣。看到桌面上的一条带着方格纸带，于是随手拿起一支笔，在纸带的每个方格中写上一个随机想起的数字。然后把纸带折起来撕成两半，她突然发现两半中各个数值加起来的和竟然是一样的。小B一下子有了一点精神，她想知道可以有多少种方式把纸带撕成两半，仍然使得两边的数值之和是相等的。
 你能帮她吗！

 输入
 测试数据有多组，每组测试数据的第一行为一个整数n（1=< n <=100000），为纸带上的方格数，第二行为n个空格分隔的数值，为小B写入方格的数值，所有的数都是绝对值不超过10000的整数。
 输出
 对每组测试数据，在单独的行中输出不同撕法的总数，使得两边纸带中的数值之和相等。将纸带撕成两半时，只能沿方格的边缘撕开。

 样例输入
 3
 1 1 1
 9
 1 5 -6 7 9 -16 0 -2 2
 2
 0 0
 样例输出
 0
 3
 1
 */
(function (str1, str2) {
    var count = str1;

    var arr = str2.split(' ');

    // int
    arr.forEach(function (ele, ind) {
        arr[ind] = +ele;
    });
    var left = 0, right = 0, result = 0, continueZero = 0;
    arr.forEach(function (ele) {
        if (ele >= 0) {

            if (right != 0 && left + right == 0) {
                result++;
                left = 0;
                right = 0
            }
            left += ele;
            continueZero = 0;
        } else if (ele == 0) {
            if (++continueZero == 2) result++;
        } else {
            right += ele;
            continueZero = 0;
        }
    });

    console.log(result);
})(9, "0 0");

/**
 * 均等
 时间限制：C/C++语言 1000MS；其他语言 3000MS
 内存限制：C/C++语言 65536KB；其他语言 589824KB
 题目描述：
 一天，小明带来了一大堆巧克力，共n条且长短不一。他想分成每条都相同长度的巧克力条分给同事，但又想偷懒，于是他想知道在能均分巧克力的前提下，用最少分割次数分割后能得到的巧克力的长度是多少。
 输入
 输入第一行一个整数n(1<=n<=50)，表示巧克力条数。
 接下来第二行n个整数Li(1<=Li<=100000)，分别表示第i条巧克力的长度。
 输出
 输出一行一个整数，表示用最少分割次数分割后能得到的巧克力的长度。

 样例输入
 4
 4 22 8 12
 样例输出
 2
 */
(function () {

})();