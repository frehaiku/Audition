// 堆排序
// 步骤：创建最大堆树，把最大堆顶的最大数取出，将剩余的堆继续调整为最大堆，再次将堆顶的最大数取出
function heapSortion(array) {

    // 交换
    function swap(array, i, k) {
        var temp = array[i]
        array[i] = array[k]
        array[k] = temp
    }

    // 最大堆调整，使得子节点永远小于父节点
    function maxHeapify(array, index, maxLength) {
        var max,
            // 取得父节点的左子树index
            left ,
            // 取得父节点的右子数index
            right

        while (true) {
            max = index
            left = 2 * index + 1
            right  = 2 * (index + 1)

            if (left < maxLength && array[index] < array[left]) {
                max = left
            }
            if (right < maxLength && array[max] < array[right]) {
                max = right
            }

            if (max != index) {
                swap(array, max, index)
                index = max
            } else {
                break
            }
        }
    }

    // 创建最大堆：将堆所有数据重新排序，使其成为最大堆
    function buildMaxHeap(array) {
        var i
            , parent = Math.floor(array.length / 2) - 1

        for (i = parent; i >= 0; i--) {
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

var {productRand, swap} = require('./sortHelper'),
  n = 100
function heapSortion1(array) {
    // min从索引0开始，根据根节点推算出左子树和右子树
    function heapAdjust(array, i, max) {
        var m = Math.floor(i / 2);
        var left = m * 2 + 1;
        var right = m * 2 + 2;
        var adjustMax = m;
        if (i <= max) {
            if (left <= max && array[left] > array[m])
                adjustMax = left;
            // 原本写成这样的。。if (right <= max && array[right] > array[m])
            // 并不能判断right一定大于left
            if (right <= max && array[right] > array[adjustMax])
                adjustMax = right;
            if (adjustMax != m) {
                swap(array, m, adjustMax);
                // 检测调整后的是否为最大堆
                heapAdjust(array, adjustMax, max);
            }
        }
    }
    
    function __heapSortion(array, length) {
        var lastIdx = length - 1;

        for (var size = lastIdx; size > 0 ; size--) {
            //构建最大堆
            for (var i = size % 2 ? size : size - 1; i > 0; i -= 2) {
                heapAdjust(array, i, size);
            }
            // 最大堆的堆顶与最后第N个元素做交换
            swap(array, 0, size);
        }
        return array;
    }

    return __heapSortion(array, array.length);
}

var example1 = productRand(1, 100, n)
console.log(heapSortion1(example1));