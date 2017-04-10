var arr = [3, 3, 5, 1, 6, 9, 1];// arr.length = 7

/*
* shift方法用于删除数组头部的元素，返回值为该元素的值,如果数组为空，将返回undefined
* */

console.log(arr.shift()); // 3
console.log(arr); // [ 3, 5, 1, 6, 9, 1 ]
/*
* pop方法从数组中删除最后一个元素，返回值为该元素的值。
*/

console.log(arr.pop()); // 1
console.log(arr); // [ 3, 5, 1, 6, 9 ]
