// 插入排序

var arr = [4, 2, 5, 3, 8, 6, 10, 2], len = arr.length;

// 普通的交换法的直接排序
function swapInsertionSort(rootArr) {
    var arr = rootArr.slice();

    var swap = function (array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    var i, j, length = arr.length;
    // i 循环的次数
    for (i = 1; i < length; i++) {
        // j 保证前j个顺序相同
        for (j = i; j > 0; j--) {
            if (arr[j - 1] > arr[j]) {
                swap(arr, j - 1, j);
            } else {
                break;
            }
        }
    }
    console.log(arr);
}

swapInsertionSort(arr);

// 优化交换的次数---直接排序从头选temp，从头排
function insertionSort(rootArr) {
    var arr = rootArr.slice();

    var length = arr.length, i, j, temp;

    for (i = 1; i < length; i++) {
        temp = arr[i];

        for (j = i - 1; j >= 0 && arr[j] > temp; j--) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = temp;
    }

    console.log(arr);
}

insertionSort(arr);

// 如果比较操作的代价比交换操作大的话，可以采用二分查找法来减少比较操作的数目，简称二分查找排序

function binarySearchInsertionSort(rootArr) {

    function binarySearch(array, start, end, temp) {
        var middle;
        while (start <= end) {
            middle = Math.floor((start + end) / 2);
            if (array[middle] > temp) {

                if (middle == 0) return middle;
                else if (array[middle - 1] < temp) {
                    return middle;
                } else {
                    end = middle - 1;
                }
            } else {
                if (array[middle + 1] >= temp) {
                    return middle + 1;
                } else {
                    start = middle + 1;
                }
            }
        }
        return end + 1;
    }

    function insertionSort(arr) {
        var arr = rootArr.slice();
        var i, j, k, temp, length = arr.length;
        for (i = 1; i < length; i++) {
            temp = arr[i];

            // 前面那数小于temp时，跳过无需排序
            if (arr[i - 1] < temp) continue;

            k = binarySearch(arr, 0, i - 1, temp);

            for (j = i; j > k; j--) {
                arr[j] = arr[j - 1];
            }
            arr[k] = temp;
        }
        return arr;
    }

    console.log(insertionSort(rootArr));
}

binarySearchInsertionSort(arr);