/**
 * Created by 海枯 on 2017/7/3.
 */

// 1.工厂函数里面的reslove发生错误时，会从then的error，向后延伸到catch函数。
// 一般在then后面不做error处理
var promiseFactoryErr = function () {
  return new Promise(
    () => {
      throw new Error('error')
    }
  )
}

promiseFactoryErr().then(
  () => {},
  () => console.log('then inner catch')
)
  .catch(() => console.log('outer catch'))

// 2. then内部发生的错误，不会立即被then内部的error函数捕获。
// 而是传递给下一个catch函数，故一般promise的错误会在catch中捕获
var promiseThenErr = function () {
  Promise.resolve()
    .then(
      () => {
        throw new Error('error')
      },
      () => console.log('then inner catch')
    )
    .catch(() => console.log('outer catch'))
}()