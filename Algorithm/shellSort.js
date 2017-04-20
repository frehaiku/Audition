/**
 * Created by frehaiku on 2017/4/18.
 *
 * 希尔排序原理：
 * 希尔排序是直接插入排序一种高效的改进版本，它的做法不是每次一个元素挨着一个元素的比较。
 * 通过将比较的全部元素分为几个区域来提升插入排序的性能。这样可以让一个元素可以一次性地朝最终位置前进一大步。
 * 然后算法再取越来越小的步长排序，算法的最后一步就是普通的插入排序。
 *
 * 算法思路：
 * 1. 先取一个正整数d1(d1<n),把全部记录分成d1个组，所有距离为d1的倍数的记录
 * 看成一个组，然后在各组内进行插入排序
 * 2. 然后取d2(d2 < d1)
 * 3. 重复上述分组和排序操作；直到取di = 1(i >= 1)位置，即所有记录成为一个组，
 * 最后对这个组进行插入排序。一般选d1约为 n / 2,d2 为 d1 / 2, d3为 d2 / 2, ... , di = 1
 */

function swap(arr, i, k) {
    var temp = arr[i];
    arr[i] = arr[k];
    arr[k] = temp;
}

function shellSort(arr) {
    var swapCount = 0;

    var cp = arr.slice(),
        len = cp.length,
        gap = Math.floor(len / 2);

    while (gap > 0) {
        for (var i = gap; i < len; i++) {
            /*if (cp[i] < cp[i - gap]) {
             swap(cp, i, i - gap);
             }*/
            for (var j = i; j > 0; j -= gap) {
                if (cp[j] < cp[j - gap]) {
                    swap(cp, j - gap, j);
                    swapCount++;
                } else {
                    break;
                }
            }
        }
        gap = Math.floor(gap / 2);
    }
    console.log("shellSort move's number："+swapCount);
    return cp;
}

function directInsertionSort(arr) {
    var cp = arr.slice(),
        leng = cp.length,
        temp,
        swapCount = 0;

    for (var i = 1; i < leng; i++) {
        temp = cp[i];

        for (var j = i; j >= 0; j--) {
            swapCount++;
            if (cp[j - 1] > temp) {
                cp[j] = cp[j - 1];
            } else {
                cp[j] = temp;
                break;
            }
        }
    }
    console.log("directInsertionSort move's number：" + swapCount);
    return cp;
}
var arr = [8, 5, 2, 6, 9, 3, 1, 4, 0, 7];
var arr1 = [5, 4, 3, 2, 1, 0];


console.log(directInsertionSort(arr));

console.log(shellSort(arr));

console.log(directInsertionSort(arr1));
console.log(shellSort(arr1));