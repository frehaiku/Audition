/**
 * Created by 海枯 on 2018/3/9.
 */

/**
 * 函数防抖
 */
function debounce(func, wait, immediate) {
  var timeout, result

  var _debounce = function (...args) {
    if (timeout)
      clearTimeout(timeout)
    // 立即执行
    if (immediate) {
      // 如果已经执行过，就不再执行
      var callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)

      if (callNow)
        result = func.apply(this, args)
    } else {
      timeout = setTimeout(() => {
        // 解决回调中this的指向，与参数传递的问题（如event）
        func.apply(this, args)
      }, wait)
    }
    return result
  }

  /**
   * 取消防抖的计时，这样再去触发就会立即执行
   */
  _debounce.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }
  return _debounce
}