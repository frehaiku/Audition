/**
 * Created by 海枯 on 2018/3/9.
 */

/**
 * 时间比较写法，特点：执行前马上会触发一次
 * @param func
 * @param wait
 * @returns {Function}
 */
function throttleDate(func, wait) {
  var last = 0, context, now
  return function (...args) {
    context = this
    now = +new Date()
    if (now - last >= wait) {
      func.apply(context, args)
      last = now
    }
  }
}

/**
 * 定时器写法，特点：执行结束前会触发一次
 * @param func
 * @param wait
 * @returns {Function}
 */
function throttleTimeout(func, wait) {
  var timeout, context
  return function (...args) {
    context = this
    if (!timeout)
      timeout = setTimeout(() => {
        timeout = null
        func.apply(context, args)
      }, wait)
  }
}

/**
 * 结合两种写法
 * @param func
 * @param wait
 * @param options = {leading, trailing}
 */
function throttle(func, wait, options = {leading: true, trailing: true}) {
  var previous = 0, timeout, context
  var later = function (args) {
    previous = +new Date()
    timeout = null
    func.apply(this, args)
  }

  var _throttle = function (...args) {
    context = this
    var now = +new Date()
    var remaining = wait - (options.leading ? now - previous : 0)

    // 超过了间隔时间未操作
    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }

      previous = now
      func.apply(context, args)
    } else if (!timeout && options.trailing) {
      timeout = setTimeout(later.bind(context, args), remaining)
    }
  }

  _throttle.cancel = function () {
    clearTimeout(timeout)
    previous = 0
    timeout = null
  }

  return _throttle
}