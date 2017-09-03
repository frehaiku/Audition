/**
 * Created by 海枯 on 2017/9/3.
 */
function curryContinuedInvoking(...arg) {
  let finalArg = [].concat(arg.slice(1))
  return function f1(...inner) {
    if (inner.length === 0) {
      return finalArg.reduce((...red) => arg[0].apply(null, red))
    }
    else {
      finalArg = finalArg.concat(inner)
      return f1
    }
  }
}

function add(a, b) {
  return a + b
}

console.log(curryContinuedInvoking(add, 2, 3)(5)(15)(25)())