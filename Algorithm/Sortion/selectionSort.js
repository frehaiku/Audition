/**
 * Created by frehaiku on 2017/4/18.
 *
 * 选择排序：
 * 基本原理：首先在未排序的序列中找到最小（最大）元素，存放到排序序列的起始位置，
 * 然后再从剩余未排序元素中继续寻找最小（最大）元素，然后放到已排序序列的末尾。
 */

function selectionSort(arr) {
    var cp = arr.slice();

    for (var i = 0; i < cp.length; i++) {
        var curr = cp[i],
        shuffle = cp.slice(i),
        min = Math.min.apply(null, shuffle),
        minInd = cp.indexOf(min),
        temp;

        if (shuffle.length > 1 && min !== curr) {
            temp = cp[minInd];
            cp[minInd] = curr;
            cp[i] = temp;
        }
    }
    return cp;
}

function selectionSortNoMin(arr) {
    var cp = arr.slice(),
    min,
    minInd,
    temp
    ;

    for (var i = 0; i < cp.length; i++) {
        min = cp[i];
        minInd = i;

        for (var j = i + 1; j < cp.length; j++) {
            temp = cp[j];
            if (temp < min) {
                min = temp;
                minInd = j;
            }
        }

        if (i !== minInd) {
            temp = cp[i];
            cp[minInd] = temp;
            cp[i] = min;
        }

    }

    return cp;
}

console.log(selectionSort([8, 5, 2, 6, 9, 3, 1, 4, 0, 7]));

console.log(selectionSortNoMin([8, 5, 2, 6, 9, 3, 1, 4, 0, 7]));