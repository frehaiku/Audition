var values = [1, 2, 3, 4, 5];

/**
 * reduce 的参数为一个回调函数，一个初始值
 * 回调函数的参数是 上一次累加的值，当前的元素值，当前值的索引，当前数组
 * @type {*}
 */
var sum = values.reduce(function (prev, cur, index, array) {
    if (index <= 2)
        return prev + cur;
     else
        return prev;
}, 3);

/**
 * reduceRight的参数与reduce相同，但遍历顺序是从右边开始的
 * @type {*}
 */
var rightSum = values.reduceRight(function (prev, cur, index, array) {
    if (index <= 2)
        return prev + cur;
    else
        return prev;
});

console.log(sum);

console.log(rightSum);
