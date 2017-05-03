// 归并排序（Merge sort）

var arr = [4, 2, 5, 3, 8, 6, 10, 2]

function mergeSort(rootArr) {
    var arr = rootArr.slice()
        , length = arr.length

    if (length == 1) {
        return arr;
    }
    var mid = Math.floor(length / 2)
        , left = arr.slice(0, mid)
        , right = arr.slice(mid)
    return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
    var arr = []

    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            arr.push(left.shift())
        } else {
            arr.push(right.shift())
        }
    }
    return arr.concat(left, right)
}

console.log(mergeSort(arr));