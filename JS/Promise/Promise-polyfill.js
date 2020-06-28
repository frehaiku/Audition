/**
 * Created by 海枯 on 2018/4/10.
 * 学习于：https://juejin.im/post/5ab20c58f265da23a228fe0f#comment
 * resolve的参数为Promise时如何处理？
 */
var MyPromise = function (executor) {
  var $this = this
  $this.PENG = 'pending'
  $this.FUL = 'fulfilled'
  $this.RJ = 'rejected'

  $this.status = 'pending'
  $this.onFulfilledCallback = []
  $this.onRejectedCallback = []
  $this.value = null
  $this.reason = null

  function resolve(onFulfilled) {
    if ($this.status === $this.PENG) {
      if (onFulfilled instanceof MyPromise) {
        onFulfilled.then(resolve, reject)
      } else {
        $this.value = onFulfilled
        $this.status = $this.FUL
        $this.onFulfilledCallback
          .forEach(payload => {
            payload()
          })
      }
    }
  }

  function reject(onRejected) {
    if ($this.status === $this.PENG) {
      $this.reason = onRejected
      $this.status = $this.RJ
      $this.onRejectedCallback
        .forEach(err => err())
    }
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x)
    return reject(new TypeError('循环引用了'))
  var called

  if (
    x == null
    || (typeof x !== 'object' && typeof x !== 'function')
  ) {
    resolve(x)
  } else {

    var then = x.then
    if (typeof then !== 'function')
      resolve(x)
    else {
      // console.log("then:", promise2)
      try {
        then.call(x, function (y) {
          if (called) return;
          called = true
            resolvePromise(promise2, y, resolve, reject)
        }, function (err) {
          if (called) return;
          called = true
          reject(err)
        })
      } catch (e) {
        if (called) return;
        called = true
        reject(e)
      }
    }

  }

}

MyPromise.prototype = {
  then (onFulfilled, onRejected) {
    var promise
    var _this = this
    if (typeof onFulfilled !== 'function')
      onFulfilled = function (value) {
        return value
      }
    if (typeof onRejected !== 'function')
      onRejected = function (err) {
        throw err
      }
    // console.log("current Promise status", _this.status)
    if (_this.status === _this.PENG) {
      promise = new MyPromise(function (resolve, reject) {

        _this.onFulfilledCallback.push(function () {
          setTimeout(function () {
            try {
              var x = onFulfilled(_this.value)
              resolvePromise(promise, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        _this.onRejectedCallback.push(function () {
          setTimeout(function () {
            try {
              var x = onRejected(_this.reason)
              resolvePromise(promise, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })

      })
    }

    if (_this.status === _this.FUL) {
      promise = new MyPromise(function (resolve, reject) {
        setTimeout(function () {
          try {
            var x = onFulfilled(_this.value)
            resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      })
    }

    if (_this.status === _this.RJ) {
      promise = new MyPromise(function (resolve, reject) {
        setTimeout(function () {
          try {
            var x = onRejected(_this.reason)
            resolvePromise(promise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      })
    }

    return promise
  }

}

MyPromise.deferred = function () {
  var def = {}
  def.promise = new MyPromise(function (resolve, reject) {
    def.resolve = resolve
    def.reject = reject
  })
  return def
}

try {
  module.exports = MyPromise
} catch (e) {
}
// example
/*var p = new MyPromise((resolve, reject) => {
 setTimeout(function () {
 reject(new MyPromise(res => res(555)))
 })
 // resolve(new MyPromise((res, rej) => rej(555)))
 })
 .then((data) => {
 // throw Error('抛出错误')
 console.log('成功', data)
 return new MyPromise((resolve) => {
 resolve('链式Promise的内容')
 })
 }, (err) => {
 console.log('失败', err)
 })*/

/*
 var q = p.then(function (d) {
 console.log(d)
 return Math.random()
 }, function (err) {
 console.log('失败', err)
 })
 .then(function (rand) {
 console.log(rand)
 })*/
/*new Promise((resolve, reject) => {
 resolve(new Promise(res => res(3)))
 })
 .then(e => {
 console.log('success', e)
 // throw new Error(e)
 }, err => {
 console.log(err)
 })
 .catch(e => console.log(e))
 .then(e => console.log(e))*/
// 多个Promise依次执行
/*var getFile = (path) => () => new Promise((resolve) => {
 console.log(path)
 setTimeout(() => {
 resolve(path)
 }, 1000)
 })

 var promiseArr = [1, 2, 3, 5].map(e => getFile(e))*/

/*promiseArr.reduce((prev, cur) => {
 return prev.then(cur)
 }, Promise.resolve())*/

/*async function excute() {
 for (var prop of promiseArr)
 await prop()
 }
 excute()*/

/*
 promiseArr.push(() => Promise.reject('abc'))
 promiseArr.push(() => Promise.reject('bcd'))

 Promise.all(promiseArr.map(e => e().catch(e => 'Error')))
 .then(times => {
 var valid = times.filter(e => e != 'Error')
 console.log(Math.min.call(null, ...valid))
 })*/