

var arr = [3, 3, 5, 1, 6, 9, 1];// arr.length = 7

/**
 * 在iteration方法中，如果在回调数组中为当前数组添加了新的元素，那么那些新的元素是不是遍历到的
 * 如果在回调数组中对当前数组进行了其他修改，，比如改变某个元素的值或者删除某个元素，遍历操作会受到未预期的影响
 */
/*arr.forEach(function (p1, p2, p3) {
    arr.push(p1 + 1);
    console.log(p1);
});*/

/**
 * 遍历过程
 * 1. [3, 3, 5, 1, 6, 9, 1]
 *     ↑
 * 2. [3, 5, 1, 6, 9, 1]
 *        ↑
 * 3. [3, 1, 6, 9, 1]
 *           ↑
 * 4. [3, 1, 9, 1]
 *              ↑
 * 5. [3, 1, 9]
 */
var copy = arr.slice();
copy.forEach(function (p1, p2, p3) {
    // console.log(p1);
    copy.splice(p2, 1);
    console.log(p3);
});

/*
 * 向数组增加元素时，可以接收任意数量的参数，push方法将元素添加到数组的末尾，返回值是增加后数组的元素
 * */
console.log(arr.push(10)); // 8

/**
 *  unshift将元素添加到数组的开头，并返回数组的长度
 */
console.log(arr.unshift(11));
