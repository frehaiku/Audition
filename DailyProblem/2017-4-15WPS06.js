/**
 * Created by 海枯 on 2017/4/15.
 * 题目要求：
 * 给定一个排好序的整数数组，判断其中是否存在两个数之和等于指定的值，
 * 时间复杂度最好能达到O(n)。例如：[1, 2, 3, 4, 5, 9], 指定值为12， 结果为true
 */

function twoPointerAdd (arr, aim) {
    return arr.some((ele, ind) => {
        let cp = arr.slice();
        cp.splice(ind, 1);

        if (cp.indexOf(aim - ele) !== -1) {
            return true;
        }
    })
}

console.log(twoPointerAdd([1, 2, 3, 4, 5, 9], 16));
