/*
* 度度熊有一个N个数的数组，他想将数组从大到小排好序，但是萌萌的度度熊只会下面这个操作：
 任取数组中的一个数然后将它放置在数组的最后一个位置。
 问最少操作多少次可以使得数组从小到大有序？
* */

/*
* 思路：
*
* 先将原数组排序，
* 排序好的数组跟原数组比较，
* 在原数组中寻找符合元素顺序的个数，
* 用数组的长度减去符合元素顺序的个数，得到的就是要移动的次数
*
* */

(function (arr) {
    var sort = arr.slice().sort(function (a, b) {
        return a - b;
    });

    var q = -1, len = sort.length;
    for (var i = 0; i < len; i++) {
        if (arr[i] === sort[q]) {
            q++;
            if (q == len) {
                break;
            }
        }

    }

    console.log(len - q);
})([17, 7, 9, 19]);