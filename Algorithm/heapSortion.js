// 堆排序

function heapSortion(array) {
    function swap(array, i, j) {
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }

    function maxHeapify(array, index, heapSize) {
        var iMax
            , left
            , right

        while (true) {
            iMax = index
                , left = 2 * index + 1
                , right = 2 * index + 2

            if (left < heapSize && array[iMax] < array[left]) {
                iMax = left
            }
            if (right < heapSize && array[iMax] < array[right]) {
                iMax = right
            }

            if (iMax != index) {
                swap(array, index, iMax)
                index = iMax
            } else {
                break;
            }
        }
    }


    function buildMaxHeap(array) {
        var i
            , iParent = Math.floor(array.length / 2) - 1

        for (i = iParent; i >= 0; i--) {
            maxHeapify(array, i, array.length)
        }
    }

    function sort(array) {
        buildMaxHeap(array)

        for (var i = array.length - 1; i > 0; i--) {
            swap(array, 0, i)
            maxHeapify(array, 0, i)
        }
        return array
    }

    return sort(array)
}

console.log(heapSortion([4, 1, 3, 2, 16, 9, 10, 14, 8, 7]));


