/**
 * 使用Promise实现调用完数组的全部元素之后，打印信息
 * 与01不同的时，要等前一个数组的异步操作执行完才能执行下一个元素
 * Created by 海枯 on 2017/7/3.
 */
var arr = [1, 2, 3, 4, 5, 6]

var oneStepInto = Promise.resolve()

var timeAsync = function (item) {
  return new Promise(resolve =>
    setTimeout(() => {
      console.log(`${item}s...`)
      resolve(item)
    }, 1000)
  )
}
var execute = function (datas) {
  console.log('1s after will poll print with interval 1s.')
  return datas.forEach(item => {
    oneStepInto = oneStepInto.then(
      () => timeAsync(item)
    )
  })
}

execute(arr)