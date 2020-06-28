let key
function type(obj) {
  return obj == null ? String(obj) : Object.prototype.toString.call(obj).match(/\w+(?=\])/)[0].toLowerCase()
}
function isObject(obj) {
  return type(obj) == 'object'
}
function isArray(arr) {
  return type(arr) == 'array'
}
function extend(target, source, deep) {
  for (key in source)
    if (deep && (isObject(source[key]) || isArray(source[key]))) {
      if (isObject(source[key]))
        target[key] = {}
      if (isArray(source[key]))
        target[key] = []
      extend(target[key], source[key], deep)
    } else if (source[key] != void 0) target[key] = source[key]
}

let source = {
  a: {b: 2},
  c: [1,5,8],
  d: '123str',
  e: 123
}, target = {}


function $extends(...args) {
  let target
  if (typeof args[0] === 'boolean') {
    target = args[1]
    args.slice(2).forEach(e => extend(target, e, true))
  } else {
    target = args[0]
    args.slice(1).forEach(e => extend(target, e))
  }
  return target
}

console.log($extends(true, target, source))

target.a.b = 3
target.c.push(10)

console.log(source)
console.log(target)