/**
 * Created by 海枯 on 2017/9/11.
 */

/**
 *
 * @param n 进了n种花
 * @param m 要求m种不一样
 * @param r 每种花需要放r朵
 * @param arr
 * @returns {number}
 */
function main(n, m, r, arr) {
  var con = 0
  var ans = 0
  var can = []
  if (m > n)
    ans = 0
  else {
    while (n - con >= m) {
      con = 0
      for (var i = 0; i < n; i++) {
        if (arr[i] >= r) {
          can.push(i)
          if (can.length >= m) {
            ans++
            desciVal(arr, can, r)
            can = []
          }
        } else if (arr[i] < r)
          con++
      }
    }
  }
  console.log(ans)
}

function desciVal(arr, idxs, r) {
  idxs.forEach(function (item) {
    arr[item] -= r
  })
}
main(3,2,3,[7,7,9])