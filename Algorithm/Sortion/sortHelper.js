/**
 * Created by 海枯 on 2017/7/2.
 */
module.exports = {
  productRand (min, max, n) {
    var arr = new Array(n)
    for (var i = 0; i < n; i++) {
      arr[i] = ~~(Math.random() * (max - min)) + min
    }
    return arr
  },
  swap (array, i, j) {
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
