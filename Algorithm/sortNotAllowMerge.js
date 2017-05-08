/**
 * Created by 海枯 on 2017/5/9.
 * 合并两个数组，要求先排序后合并
 *
 * 原理：间接利用了归并排序的思想，
 * 先将两数组排好序，再合并排序
 */

function mergeSort(arr) {
    if (arr.length == 1) return arr;

    var mid = Math.floor(arr.length / 2),
        left = arr.slice(0, mid),
        right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var lInd = 0, rightInd = 0, arr = [];
    while(lInd != left.length && rightInd != right.length) {
        if (left[lInd] < right[rightInd]) {
            arr.push(left[lInd++])
        } else {
            arr.push(right[rightInd++])
        }
    }
    return arr.concat((lInd == left.length ? right.slice(rightInd) : left.slice(lInd)))
}

var left = [4, 2, 5, 3], right = [8, 6, 10, 2]

console.log(merge(mergeSort(left), mergeSort(right)));
