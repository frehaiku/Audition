let key
function type(obj) {
  return obj == null ? String(obj) : typeof obj
}
function isObject(obj) {
  return type(obj) == 'object'
}

function isPlainObject(obj) {
  return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype
}

function isArray(arr) {
  return Array.isArray(arr) || arr instanceof Array
}

function extend(target, source, deep) {
  for (key in source)
    if (!!deep && isPlainObject(source[key]) || isArray(source[key])) {
      if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
        target[key] = {}
      }
      if (isArray(source[key]) && !isArray(target[key])) {
        target[key] = []
      }
      extend(target[key], source[key], deep)
    } else if (source[key] != undefined) {
      target[key] = source[key]
    }
}

let source = {
  a: {b: 2},
  c: [1,5,8]
}, target = {}

extend(target, source, true)

target.a.b = 3
console.log(source)
console.log(target)

