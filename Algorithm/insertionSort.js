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